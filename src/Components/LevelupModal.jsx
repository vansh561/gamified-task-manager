import { COLORS } from "../Config/gameConfig";

/**
 * LevelUpModal — full-screen overlay that animates when player levels up.
 * Props: levelUpAnim = level object | null
 */
export default function LevelUpModal({ levelUpAnim }) {
  if (!levelUpAnim) return null;

  return (
    <div
      style={{
        position:       "fixed",
        inset:          0,
        zIndex:         9998,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        background:     "rgba(0,0,0,0.7)",
        animation:      "fadeIn 0.2s ease",
      }}
    >
      <div
        style={{
          background:   COLORS.card,
          border:       `2px solid ${levelUpAnim.color}`,
          borderRadius: 20,
          padding:      "40px 60px",
          textAlign:    "center",
          animation:    "levelUp 2.5s ease forwards",
          boxShadow:    `0 0 60px ${levelUpAnim.color}60`,
        }}
      >
        <div style={{ fontSize: 60, marginBottom: 12 }}>🎉</div>
        <div
          style={{
            fontFamily: "Rajdhani",
            fontWeight: 700,
            fontSize:   36,
            color:      levelUpAnim.color,
          }}
        >
          LEVEL UP!
        </div>
        <div style={{ fontSize: 20, color: COLORS.text, marginTop: 4 }}>
          You are now a{" "}
          <strong style={{ color: levelUpAnim.color }}>{levelUpAnim.title}</strong>
        </div>
        <div style={{ fontSize: 14, color: COLORS.muted, marginTop: 8 }}>
          Level {levelUpAnim.level}
        </div>
      </div>
    </div>
  );
}
