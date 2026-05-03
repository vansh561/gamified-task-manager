import { useGame } from "../Context/GameContext";
import { COLORS } from "../Config/gameConfig";
import { NAV_ITEMS } from "./Navbar";

/**
 * TopBar — sticky header showing app name, current streak, and level.
 */
export default function TopBar() {
  const { stats, getCurrentLevel, page } = useGame();
  const cur       = getCurrentLevel(stats.xp);
  const pageLabel = NAV_ITEMS.find((n) => n.id === page)?.label || "";

  return (
    <header
      style={{
        position:       "sticky",
        top:            0,
        zIndex:         900,
        background:     `${COLORS.bg}e0`,
        backdropFilter: "blur(16px)",
        borderBottom:   `1px solid ${COLORS.border}`,
        padding:        "12px 20px",
        display:        "flex",
        justifyContent: "space-between",
        alignItems:     "center",
      }}
    >
      {/* Logo + current page */}
      <div style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: 22 }}>
        <span style={{ color: COLORS.accent }}>QUEST</span>
        <span style={{ color: COLORS.text   }}>OS</span>
        <span style={{ fontSize: 11, color: COLORS.muted, marginLeft: 10, fontWeight: 400 }}>
          /{pageLabel}
        </span>
      </div>

      {/* Quick stats */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Streak pill */}
        <div
          style={{
            display:      "flex",
            alignItems:   "center",
            gap:          6,
            background:   COLORS.card,
            border:       `1px solid ${COLORS.border}`,
            borderRadius: 20,
            padding:      "5px 12px",
          }}
        >
          <span style={{ fontSize: 14 }}>🔥</span>
          <span
            style={{
              fontFamily: "Rajdhani",
              fontWeight: 700,
              color:      COLORS.gold,
              fontSize:   14,
            }}
          >
            {stats.streak}d
          </span>
        </div>

        {/* Level pill */}
        <div
          style={{
            display:      "flex",
            alignItems:   "center",
            gap:          6,
            background:   COLORS.card,
            border:       `1px solid ${cur.color}50`,
            borderRadius: 20,
            padding:      "5px 12px",
          }}
        >
          <span style={{ fontSize: 12, color: cur.color, fontWeight: 700 }}>
            Lv.{stats.level}
          </span>
          <span style={{ fontSize: 12, color: COLORS.muted }}>{cur.title}</span>
        </div>
      </div>
    </header>
  );
}
