import { COLORS } from "../Config/gameConfig";

/**
 * StatCard — reusable card for displaying a single statistic.
 * Props: icon (emoji), label (string), value (string|number),
 *        color (hex), delay (animation delay in seconds)
 */
export default function StatCard({ icon, label, value, color, delay = 0 }) {
  return (
    <div
      style={{
        background:   COLORS.card,
        borderRadius: 12,
        padding:      "16px 20px",
        border:       `1px solid ${COLORS.border}`,
        textAlign:    "center",
        animation:    `fadeInUp 0.4s ease ${delay}s both`,
        position:     "relative",
        overflow:     "hidden",
      }}
    >
      {/* Radial glow accent */}
      <div
        style={{
          position:       "absolute",
          inset:          0,
          background:     `radial-gradient(circle at 50% 0%, ${color}15, transparent 70%)`,
          pointerEvents:  "none",
        }}
      />

      <div style={{ fontSize: 26, marginBottom: 6 }}>{icon}</div>
      <div
        style={{
          fontFamily: "Rajdhani",
          fontWeight: 700,
          fontSize:   24,
          color,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize:      11,
          color:         COLORS.muted,
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        {label}
      </div>
    </div>
  );
}
