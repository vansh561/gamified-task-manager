import { useGame } from "../Context/GameContext";
import { COLORS } from "../Config/gameConfig";

export default function XPBar() {
  const { stats, getCurrentLevel, getNextLevel } = useGame();

  const cur        = getCurrentLevel(stats.xp);
  const next       = getNextLevel(stats.xp);
  const xpInLevel  = stats.xp - cur.xpRequired;
  const xpNeeded   = next ? next.xpRequired - cur.xpRequired : 1;
  const pct        = next ? Math.min(100, (xpInLevel / xpNeeded) * 100) : 100;

  return (
    <div
      style={{
        background:   COLORS.card,
        borderRadius: 12,
        padding:      "14px 20px",
        border:       `1px solid ${COLORS.border}`,
        animation:    "fadeInUp 0.4s ease",
      }}
    >
      {/* Top Row */}
      <div
        style={{
          display:        "flex",
          justifyContent: "space-between",
          alignItems:     "center",
          marginBottom:   8,
        }}
      >
        {/* Left: Level badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>⚔️</span>
          <div>
            <div
              style={{
                fontFamily: "Rajdhani",
                fontWeight: 700,
                fontSize:   18,
                color:      cur.color,
              }}
            >
              {cur.title}
            </div>
            <div style={{ fontSize: 11, color: COLORS.muted }}>
              Level {cur.level}
            </div>
          </div>
        </div>

        {/* Right: XP numbers */}
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontFamily: "Rajdhani",
              fontWeight: 600,
              fontSize:   16,
              color:      COLORS.accentGlow,
            }}
          >
            {stats.xp} XP
          </div>
          {next && (
            <div style={{ fontSize: 11, color: COLORS.muted }}>
              {next.xpRequired - stats.xp} to {next.title}
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          background:   COLORS.surface,
          borderRadius: 99,
          height:       10,
          overflow:     "hidden",
          border:       `1px solid ${COLORS.border}`,
        }}
      >
        <div
          style={{
            height:           "100%",
            borderRadius:     99,
            background:       `linear-gradient(90deg, ${cur.color}, ${COLORS.accentGlow})`,
            width:            `${pct}%`,
            boxShadow:        `0 0 8px ${cur.color}80`,
            transition:       "width 0.8s cubic-bezier(.4,0,.2,1)",
          }}
        />
      </div>

      {/* Min / Max labels */}
      <div
        style={{
          display:        "flex",
          justifyContent: "space-between",
          marginTop:      4,
          fontSize:       11,
          color:          COLORS.muted,
        }}
      >
        <span>{cur.xpRequired} XP</span>
        {next && <span>{next.xpRequired} XP</span>}
      </div>
    </div>
  );
}
