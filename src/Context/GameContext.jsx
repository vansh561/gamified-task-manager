import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import {
  DEFAULT_STATS,
  BADGES,
  TASK_PRIORITIES,
  getCurrentLevel,
  getNextLevel,
} from "../config/gameConfig";

// ─── CREATE CONTEXT ──────────────────────────────────────────────────────────
export const GameContext = createContext(null);

// ─── CUSTOM HOOK ─────────────────────────────────────────────────────────────
export const useGame = () => useContext(GameContext);

// ─── PROVIDER ────────────────────────────────────────────────────────────────
export function GameProvider({ children }) {
  // ── State ──────────────────────────────────────────────────────────────────
  const [stats, setStats] = useState(() => {
    try {
      return { ...DEFAULT_STATS, ...JSON.parse(localStorage.getItem("gm_stats") || "{}") };
    } catch {
      return DEFAULT_STATS;
    }
  });

  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("gm_tasks") || "[]");
    } catch {
      return [];
    }
  });

  const [page, setPage]               = useState("dashboard");
  const [toast, setToast]             = useState(null);
  const [levelUpAnim, setLevelUpAnim] = useState(null);
  const [xpFloat, setXpFloat]         = useState([]);
  const [quote, setQuote]             = useState({ text: "Loading wisdom...", author: "" });
  const [quoteLoading, setQuoteLoading] = useState(false);

  const xpFloatId = useRef(0);

  // ── Persist to localStorage ────────────────────────────────────────────────
  useEffect(() => {
    localStorage.setItem("gm_stats", JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem("gm_tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ── Streak check on mount ─────────────────────────────────────────────────
  useEffect(() => {
    const today = new Date().toDateString();
    setStats((prev) => {
      if (!prev.lastActiveDate) return prev;
      const lastDate = new Date(prev.lastActiveDate);
      const diff = Math.floor((new Date(today) - lastDate) / 86400000);
      if (diff > 1) return { ...prev, streak: 0 };
      return prev;
    });
  }, []);

  // ── API: Fetch Motivational Quote (Anthropic Claude API) ──────────────────
  const fetchQuote = useCallback(async () => {
    setQuoteLoading(true);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 100,
          messages: [
            {
              role: "user",
              content:
                'Give me ONE short motivational quote for a productivity app. Respond ONLY with JSON: {"text": "...", "author": "..."}',
            },
          ],
        }),
      });
      const data = await response.json();
      const raw = data.content?.find((b) => b.type === "text")?.text || "{}";
      const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
      setQuote(parsed);
    } catch {
      // Fallback quotes if API fails
      const fallbacks = [
        { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
        { text: "Small progress is still progress.",               author: "Unknown"    },
        { text: "Every task completed is a battle won.",           author: "Unknown"    },
      ];
      setQuote(fallbacks[Math.floor(Math.random() * fallbacks.length)]);
    }
    setQuoteLoading(false);
  }, []);

  useEffect(() => {
    fetchQuote();
  }, []);

  // ── Toast Helper ──────────────────────────────────────────────────────────
  const showToast = (msg, type = "success") => {
    setToast({ msg, type, id: Date.now() });
    setTimeout(() => setToast(null), 2800);
  };

  // ── XP Float Helper ───────────────────────────────────────────────────────
  const addXpFloat = (amount, taskId) => {
    const fid = ++xpFloatId.current;
    setXpFloat((prev) => [...prev, { id: fid, amount, taskId }]);
    setTimeout(() => setXpFloat((prev) => prev.filter((f) => f.id !== fid)), 1500);
  };

  // ── Badge Checker ─────────────────────────────────────────────────────────
  const checkBadges = (newStats) => {
    return BADGES.filter(
      (badge) => !newStats.earnedBadges.includes(badge.id) && badge.condition(newStats)
    ).map((badge) => badge.id);
  };

  // ── Complete Task ─────────────────────────────────────────────────────────
  const completeTask = useCallback(
    (taskId) => {
      const task = tasks.find((t) => t.id === taskId);
      if (!task || task.completed) return;

      // Mark task as completed
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId ? { ...t, completed: true, completedAt: Date.now() } : t
        )
      );

      const priority = TASK_PRIORITIES.find((p) => p.value === task.priority);
      const xpGain   = priority?.xp || 10;
      const today    = new Date().toDateString();

      setStats((prev) => {
        const newXP      = prev.xp + xpGain;
        const newTotalXP = (prev.totalXP || 0) + xpGain;
        const oldLevel   = getCurrentLevel(prev.xp);
        const newLevel   = getCurrentLevel(newXP);

        // Daily counter
        const dailySame        = prev.dailyDate === today;
        const newDailyCompleted = dailySame ? prev.dailyCompleted + 1 : 1;

        // Streak calc
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const lastD = prev.lastActiveDate;
        let newStreak = prev.streak;
        if (!lastD) {
          newStreak = 1;
        } else if (new Date(lastD).toDateString() === today) {
          newStreak = prev.streak; // same day, no change
        } else if (new Date(lastD).toDateString() === yesterday.toDateString()) {
          newStreak = prev.streak + 1; // consecutive day
        } else {
          newStreak = 1; // streak broken
        }

        const updated = {
          ...prev,
          xp:              newXP,
          totalXP:         newTotalXP,
          level:           newLevel.level,
          totalCompleted:  prev.totalCompleted + 1,
          completedEpic:   task.priority === "epic" ? prev.completedEpic + 1 : prev.completedEpic,
          streak:          newStreak,
          lastActiveDate:  today,
          dailyCompleted:  newDailyCompleted,
          dailyDate:       today,
        };

        // Check newly earned badges
        const newBadges = checkBadges(updated);
        if (newBadges.length) {
          updated.earnedBadges = [...(prev.earnedBadges || []), ...newBadges];
          newBadges.forEach((bid) => {
            const b = BADGES.find((b) => b.id === bid);
            setTimeout(() => showToast(`🏅 Badge Unlocked: ${b.name}`, "badge"), 600);
          });
        }

        // Level up animation
        if (newLevel.level > oldLevel.level) {
          setLevelUpAnim(newLevel);
          setTimeout(() => setLevelUpAnim(null), 2500);
        }

        return updated;
      });

      addXpFloat(xpGain, taskId);
      showToast(`+${xpGain} XP earned! ✨`, "xp");
    },
    [tasks]
  );

  // ── Add Task ──────────────────────────────────────────────────────────────
  const addTask = (task) => {
    setTasks((prev) => [
      ...prev,
      { ...task, id: Date.now(), completed: false, createdAt: Date.now() },
    ]);
    showToast("Quest added! 🗡️", "success");
  };

  // ── Delete Task ───────────────────────────────────────────────────────────
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // ── Context Value ─────────────────────────────────────────────────────────
  const value = {
    stats,
    tasks,
    page,
    setPage,
    toast,
    levelUpAnim,
    xpFloat,
    quote,
    quoteLoading,
    fetchQuote,
    completeTask,
    addTask,
    deleteTask,
    getCurrentLevel,
    getNextLevel,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
