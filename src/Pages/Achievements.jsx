import { useGame } from "../Context/GameContext";
import { COLORS, LEVELS, BADGES } from "../Config/gameConfig";

/**
 * Achievements — Hall of Fame page showing level milestones and all badges.
 */
export default function Achievements() {
  const { stats } = useGame();
  const earned = stats.earnedBadges || [];

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <h1 style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: 26, marginBottom: 20 }}>
        Hall of Fame 🏆
      </h1>

      {/* ── Level Milestones ──────────────────────────────────────────── */}
      <div
        style={{
          background:   COLORS.card,
          borderRadius: 16,
          padding:      20,
          border:       `1px solid ${COLORS.border}`,
          marginBottom: 24,
        }}
      >
        <h2
          style={{
            fontFamily:   "Rajdhani",
            fontWeight:   700,
            fontSize:     18,
            marginBottom: 16,
            color:        COLORS.gold,
          }}
        >
          Level Milestones
        </h2>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {LEVELS.map((lvl) => {
            const unlocked = stats.level >= lvl.level;
            return (
              <div
                key={lvl.level}
                style={{
                  padding:      "10px 16px",
                  borderRadius: 10,
                  background:   unlocked ? `${lvl.color}20` : COLORS.surface,
                  border:       `1px solid ${unlocked ? lvl.color : COLORS.border}`,
                  textAlign:    "center",
                  opacity:      unlocked ? 1 : 0.4,
                  transition:   "all 0.2s",
                  animation:    unlocked ? "glow 3s infinite" : "none",
                }}
              >
                <div
                  style={{
                    fontFamily: "Rajdhani",
                    fontWeight: 700,
                    fontSize:   14,
                    color:      unlocked ? lvl.color : COLORS.muted,
                  }}
                >
                  {lvl.title}
                </div>
                <div style={{ fontSize: 11, color: COLORS.muted }}>Lv.{lvl.level}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Badges Grid ──────────────────────────────────────────────── */}
      <h2
        style={{
          fontFamily:   "Rajdhani",
          fontWeight:   700,
          fontSize:     18,
          marginBottom: 14,
          color:        COLORS.text,
        }}
      >
        Badges ({earned.length}/{BADGES.length})
      </h2>

      <div
        style={{
          display:             "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap:                 12,
        }}
      >
        {BADGES.map((badge, i) => {
          const has = earned.includes(badge.id);
          return (
            <div
              key={badge.id}
              style={{
                background:   has ? COLORS.card : COLORS.surface,
                border:       `1px solid ${has ? COLORS.gold + "80" : COLORS.border}`,
                borderRadius: 14,
                padding:      "18px 16px",
                textAlign:    "center",
                opacity:      has ? 1 : 0.4,
                animation:    `fadeInUp 0.35s ease ${i * 0.04}s both`,
                transition:   "all 0.2s",
                boxShadow:    has ? `0 0 12px ${COLORS.gold}20` : "none",
              }}
            >
              <div
                style={{
                  fontSize:  34,
                  marginBottom: 8,
                  animation: has ? "badgeBounce 2s infinite" : "none",
                }}
              >
                {badge.icon}
              </div>
              <div
                style={{
                  fontFamily: "Rajdhani",
                  fontWeight: 700,
                  fontSize:   14,
                  color:      has ? COLORS.gold : COLORS.muted,
                }}
              >
                {badge.name}
              </div>
              <div
                style={{
                  fontSize:  11,
                  color:     COLORS.muted,
                  marginTop: 4,
                  lineHeight: 1.4,
                }}
              >
                {badge.desc}
              </div>
              {has && (
                <div
                  style={{
                    marginTop:  8,
                    fontSize:   10,
                    color:      COLORS.green,
                    fontWeight: 600,
                  }}
                >
                  ✓ UNLOCKED
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
