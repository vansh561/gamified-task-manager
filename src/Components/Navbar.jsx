import { useGame } from "../Context/GameContext";
import { COLORS } from "../Config/gameConfig";

// Navigation items — acts like React Router links
export const NAV_ITEMS = [
  { id: "dashboard",    label: "Dashboard", icon: "🏠" },
  { id: "tasks",        label: "Quests",    icon: "⚔️" },
  { id: "achievements", label: "Trophies",  icon: "🏆" },
  { id: "profile",      label: "Hero",      icon: "👤" },
];

/**
 * Navbar — fixed bottom navigation bar.
 * Uses context page state to simulate React Router navigation.
 */
export default function Navbar() {
  const { page, setPage } = useGame();

  return (
    <nav
      style={{
        position:       "fixed",
        bottom:         0,
        left:           0,
        right:          0,
        zIndex:         1000,
        background:     `${COLORS.surface}f0`,
        borderTop:      `1px solid ${COLORS.border}`,
        backdropFilter: "blur(16px)",
        display:        "flex",
        justifyContent: "space-around",
        padding:        "8px 0 12px",
      }}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = page === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            style={{
              display:        "flex",
              flexDirection:  "column",
              alignItems:     "center",
              gap:            3,
              padding:        "6px 14px",
              borderRadius:   12,
              color:          isActive ? COLORS.accentGlow : COLORS.muted,
              background:     isActive ? `${COLORS.accent}20` : "transparent",
              transition:     "all 0.2s",
              transform:      isActive ? "scale(1.08)" : "scale(1)",
            }}
          >
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <span
              style={{
                fontSize:      10,
                fontWeight:    600,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
