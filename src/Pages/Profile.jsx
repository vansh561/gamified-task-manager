import { useGame } from "../Context/GameContext";
import { COLORS } from "../Config/gameConfig";

/**
 * Profile — Hero profile page showing stats card and category breakdown chart.
 */
export default function Profile() {
  const { stats, tasks, getCurrentLevel, getNextLevel } = useGame();

  const cur  = getCurrentLevel(stats.xp);
  const next = getNextLevel(stats.xp);

  // ── Category breakdown ────────────────────────────────────────────────────
  const completedByCategory = {};
  tasks
    .filter((t) => t.completed)
    .forEach((t) => {
      const cat = t.category || "Other";
      completedByCategory[cat] = (completedByCategory[cat] || 0) + 1;
    });
  const maxCount = Math.max(...Object.values(completedByCategory), 1);

  // ── Hero avatar by level ──────────────────────────────────────────────────
  const heroAvatar =
    stats.level >= 7 ? "🐲" :
    stats.level >= 5 ? "⚔️" :
    stats.level >= 3 ? "🛡️" :
    "🗡️";

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <h1 style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: 26, marginBottom: 20 }}>
        Hero Profile ⚔️
      </h1>

      {/* ── Hero Card ─────────────────────────────────────────────────── */}
      <div
        style={{
          background:   `linear-gradient(135deg, ${COLORS.card}, ${COLORS.surface})`,
          borderRadius: 20,
          padding:      28,
          border:       `1px solid ${cur.color}50`,
          marginBottom: 20,
          position:     "relative",
          overflow:     "hidden",
          boxShadow:    `0 8px 32px ${cur.color}20`,
        }}
      >
        {/* Top accent stripe */}
        <div
          style={{
            position:   "absolute",
            top:        0,
            left:       0,
            right:      0,
            height:     3,
            background: `linear-gradient(90deg, ${cur.color}, ${COLORS.accentGlow})`,
          }}
        />
        {/* Background glow orb */}
        <div
          style={{
            position:     "absolute",
            top:          -30,
            right:        -30,
            width:        120,
            height:       120,
            borderRadius: "50%",
            background:   `${cur.color}10`,
            border:       `1px solid ${cur.color}20`,
          }}
        />

        {/* Avatar + level info */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
          <div
            style={{
              width:          80,
              height:         80,
              borderRadius:   "50%",
              background:     `linear-gradient(135deg, ${cur.color}40, ${COLORS.accent}40)`,
              border:         `3px solid ${cur.color}`,
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              fontSize:       36,
              animation:      "glow 3s infinite",
            }}
          >
            {heroAvatar}
          </div>
          <div>
            <div
              style={{
                fontFamily: "Rajdhani",
                fontWeight: 700,
                fontSize:   28,
                color:      cur.color,
              }}
            >
              {cur.title}
            </div>
            <div style={{ color: COLORS.muted, fontSize: 14 }}>
              Level {cur.level} Hero
            </div>
            {next && (
              <div style={{ color: COLORS.muted, fontSize: 12, marginTop: 2 }}>
                Next: {next.title} at {next.xpRequired} XP
              </div>
            )}
          </div>
        </div>

        {/* Mini stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {[
            { label: "Total XP",   value: stats.totalXP || stats.xp, icon: "⚡", color: COLORS.accentGlow },
            { label: "Day Streak", value: `${stats.streak}`,          icon: "🔥", color: COLORS.gold       },
            { label: "Quests Done",value: stats.totalCompleted,        icon: "✅", color: COLORS.green      },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background:   COLORS.surface,
                borderRadius: 10,
                padding:      "12px 14px",
                textAlign:    "center",
              }}
            >
              <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
              <div
                style={{
                  fontFamily: "Rajdhani",
                  fontWeight: 700,
                  fontSize:   20,
                  color:      s.color,
                }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: 11, color: COLORS.muted }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Category Breakdown ────────────────────────────────────────── */}
      {Object.keys(completedByCategory).length > 0 && (
        <div
          style={{
            background:   COLORS.card,
            borderRadius: 16,
            padding:      20,
            border:       `1px solid ${COLORS.border}`,
          }}
        >
          <h2
            style={{
              fontFamily:   "Rajdhani",
              fontWeight:   700,
              fontSize:     18,
              marginBottom: 16,
            }}
          >
            Quest Categories
          </h2>

          {Object.entries(completedByCategory).map(([cat, count]) => {
            const pct = (count / maxCount) * 100;
            return (
              <div key={cat} style={{ marginBottom: 14 }}>
                <div
                  style={{
                    display:        "flex",
                    justifyContent: "space-between",
                    marginBottom:   5,
                    fontSize:       13,
                  }}
                >
                  <span style={{ color: COLORS.text }}>{cat}</span>
                  <span style={{ color: COLORS.muted }}>{count} quests</span>
                </div>
                <div
                  style={{
                    background:   COLORS.surface,
                    borderRadius: 99,
                    height:       8,
                    overflow:     "hidden",
                  }}
                >
                  <div
                    style={{
                      height:       "100%",
                      width:        `${pct}%`,
                      background:   `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentGlow})`,
                      borderRadius: 99,
                      transition:   "width 1s ease",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
