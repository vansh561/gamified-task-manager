import { useGame } from "../Context/GameContext";
import { COLORS } from "../Config/gameConfig";
import XPBar    from "../Components/XPbar";
import StatCard from "../Components/Statuscard";
import TaskCard from "../Components/Taskcard";
import EmptyState from "../Components/Emptystate";

/**
 * Dashboard — home page showing XP bar, stats, quote, and quick task list.
 */
export default function Dashboard() {
  const {
    stats, tasks, quote, quoteLoading, fetchQuote,
    completeTask, deleteTask, xpFloat,
  } = useGame();

  const activeTasks      = tasks.filter((t) => !t.completed);
  const recentCompleted  = tasks
    .filter((t) => t.completed)
    .sort((a, b) => b.completedAt - a.completedAt)
    .slice(0, 3);

  return (
    <div style={{ paddingBottom: 40, animation: "fadeIn 0.3s ease" }}>

      {/* ── Motivational Quote Banner ───────────────────────────────────── */}
      <div
        style={{
          background:   `linear-gradient(135deg, ${COLORS.card}, ${COLORS.surface})`,
          borderRadius: 16,
          padding:      "20px 24px",
          marginBottom: 20,
          border:       `1px solid ${COLORS.border}`,
          position:     "relative",
          overflow:     "hidden",
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position:   "absolute",
            top:        0,
            left:       0,
            right:      0,
            height:     2,
            background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.cyan})`,
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            {quoteLoading ? (
              <div style={{ color: COLORS.muted, animation: "pulse 1s infinite" }}>
                Fetching wisdom...
              </div>
            ) : (
              <>
                <div style={{ fontSize: 15, color: COLORS.text, fontStyle: "italic", lineHeight: 1.6 }}>
                  "{quote.text}"
                </div>
                {quote.author && (
                  <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 6 }}>
                    — {quote.author}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Refresh quote button */}
          <button
            onClick={fetchQuote}
            title="Get new quote"
            style={{
              marginLeft:   12,
              padding:      "6px 12px",
              background:   COLORS.surface,
              border:       `1px solid ${COLORS.border}`,
              borderRadius: 8,
              color:        COLORS.muted,
              fontSize:     18,
              transition:   "all 0.2s",
            }}
          >
            🔄
          </button>
        </div>
      </div>

      {/* ── XP Progress Bar ─────────────────────────────────────────────── */}
      <XPBar />

      {/* ── Stats Row ───────────────────────────────────────────────────── */}
      <div
        style={{
          display:             "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap:                 12,
          marginTop:           16,
        }}
      >
        <StatCard icon="🔥" label="Streak"    value={`${stats.streak}d`}           color={COLORS.gold}       delay={0.05} />
        <StatCard icon="✅" label="Completed"  value={stats.totalCompleted}          color={COLORS.green}      delay={0.10} />
        <StatCard icon="⚡" label="Total XP"   value={stats.totalXP || stats.xp}    color={COLORS.accentGlow} delay={0.15} />
        <StatCard icon="🏅" label="Badges"     value={(stats.earnedBadges || []).length} color={COLORS.cyan}  delay={0.20} />
      </div>

      {/* ── Active Tasks ─────────────────────────────────────────────────── */}
      <div style={{ marginTop: 24 }}>
        <div
          style={{
            display:        "flex",
            justifyContent: "space-between",
            alignItems:     "center",
            marginBottom:   12,
          }}
        >
          <h2 style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: 20, color: COLORS.text }}>
            Active Quests{" "}
            {activeTasks.length > 0 && (
              <span style={{ color: COLORS.muted, fontSize: 14, fontWeight: 400 }}>
                ({activeTasks.length})
              </span>
            )}
          </h2>
        </div>

        {activeTasks.length === 0 ? (
          <EmptyState icon="🗡️" msg="No active quests. Add one from Quests!" />
        ) : (
          activeTasks.slice(0, 5).map((task, i) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={completeTask}
              onDelete={deleteTask}
              delay={i * 0.06}
              xpFloat={xpFloat}
            />
          ))
        )}

        {activeTasks.length > 5 && (
          <div style={{ textAlign: "center", marginTop: 8, color: COLORS.muted, fontSize: 13 }}>
            +{activeTasks.length - 5} more quests in the Quests page
          </div>
        )}
      </div>

      {/* ── Recently Completed ───────────────────────────────────────────── */}
      {recentCompleted.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <h2 style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: 20, color: COLORS.text, marginBottom: 12 }}>
            Recently Slain ⚔️
          </h2>
          {recentCompleted.map((task, i) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={() => {}}
              onDelete={deleteTask}
              delay={i * 0.06}
              completed
            />
          ))}
        </div>
      )}
    </div>
  );
}
