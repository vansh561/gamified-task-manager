// ─── COLORS ─────────────────────────────────────────────────────────────────
export const COLORS = {
  bg: "#0a0a0f",
  surface: "#12121a",
  card: "#1a1a26",
  border: "#2a2a3d",
  accent: "#7c3aed",
  accentGlow: "#a855f7",
  gold: "#f59e0b",
  green: "#10b981",
  red: "#ef4444",
  blue: "#3b82f6",
  cyan: "#06b6d4",
  text: "#e2e8f0",
  muted: "#64748b",
};

// ─── LEVELS ──────────────────────────────────────────────────────────────────
export const LEVELS = [
  { level: 1, title: "Novice",     xpRequired: 0,    color: "#64748b" },
  { level: 2, title: "Apprentice", xpRequired: 100,  color: "#3b82f6" },
  { level: 3, title: "Warrior",    xpRequired: 300,  color: "#10b981" },
  { level: 4, title: "Knight",     xpRequired: 600,  color: "#7c3aed" },
  { level: 5, title: "Champion",   xpRequired: 1000, color: "#f59e0b" },
  { level: 6, title: "Legend",     xpRequired: 1500, color: "#ef4444" },
  { level: 7, title: "Mythic",     xpRequired: 2200, color: "#06b6d4" },
  { level: 8, title: "Divine",     xpRequired: 3000, color: "#a855f7" },
];

// ─── BADGES ──────────────────────────────────────────────────────────────────
export const BADGES = [
  { id: "first_task",   name: "First Blood",    desc: "Complete your first task",    icon: "⚔️",  condition: (s) => s.totalCompleted >= 1  },
  { id: "streak_3",     name: "On Fire",        desc: "3-day streak",                icon: "🔥",  condition: (s) => s.streak >= 3          },
  { id: "streak_7",     name: "Unstoppable",    desc: "7-day streak",                icon: "💥",  condition: (s) => s.streak >= 7          },
  { id: "xp_500",       name: "Power Surge",    desc: "Earn 500 XP",                 icon: "⚡",  condition: (s) => s.totalXP >= 500       },
  { id: "xp_1000",      name: "XP Hunter",      desc: "Earn 1000 XP",                icon: "🏹",  condition: (s) => s.totalXP >= 1000      },
  { id: "tasks_10",     name: "Grinder",        desc: "Complete 10 tasks",           icon: "⚙️",  condition: (s) => s.totalCompleted >= 10 },
  { id: "tasks_25",     name: "Task Master",    desc: "Complete 25 tasks",           icon: "🎯",  condition: (s) => s.totalCompleted >= 25 },
  { id: "epic_task",    name: "Epic Slayer",    desc: "Complete an epic task",       icon: "🐉",  condition: (s) => s.completedEpic >= 1   },
  { id: "speed_demon",  name: "Speed Demon",    desc: "Complete 3 tasks in a day",   icon: "🚀",  condition: (s) => s.dailyCompleted >= 3  },
  { id: "perfectionist",name: "Perfectionist",  desc: "Reach level 5",               icon: "💎",  condition: (s) => s.level >= 5           },
];

// ─── TASK PRIORITIES ─────────────────────────────────────────────────────────
export const TASK_PRIORITIES = [
  { value: "low",    label: "Low",    xp: 10,  color: "#10b981", icon: "🟢" },
  { value: "medium", label: "Medium", xp: 25,  color: "#f59e0b", icon: "🟡" },
  { value: "high",   label: "High",   xp: 50,  color: "#ef4444", icon: "🔴" },
  { value: "epic",   label: "Epic",   xp: 100, color: "#a855f7", icon: "🔮" },
];

// ─── CATEGORIES ──────────────────────────────────────────────────────────────
export const CATEGORIES = ["Work", "Health", "Learning", "Personal", "Side Quest"];

// ─── DEFAULT STATS ───────────────────────────────────────────────────────────
export const DEFAULT_STATS = {
  xp: 0,
  totalXP: 0,
  level: 1,
  streak: 0,
  lastActiveDate: null,
  totalCompleted: 0,
  completedEpic: 0,
  dailyCompleted: 0,
  dailyDate: null,
  earnedBadges: [],
};

// ─── LEVEL HELPERS ───────────────────────────────────────────────────────────
export const getCurrentLevel = (xp) => {
  let current = LEVELS[0];
  for (const lvl of LEVELS) {
    if (xp >= lvl.xpRequired) current = lvl;
  }
  return current;
};

export const getNextLevel = (xp) => {
  const cur = getCurrentLevel(xp);
  return LEVELS.find((l) => l.level === cur.level + 1) || null;
};
