import { COLORS } from "../Config/gameConfig";

/**
 * Toast — slide-in notification popup.
 * Props: toast = { msg, type } | null
 * Types: "xp" | "success" | "badge" | "error"
 */
export default function Toast({ toast }) {
  if (!toast) return null;

  const colorMap = {
    xp:      COLORS.accentGlow,
    success: COLORS.green,
    badge:   COLORS.gold,
    error:   COLORS.red,
  };
  const color = colorMap[toast.type] || COLORS.accentGlow;

  return (
    <div
      style={{
        position:   "fixed",
        top:        80,
        right:      20,
        zIndex:     9999,
        background: COLORS.card,
        border:     `1px solid ${color}`,
        borderRadius: 12,
        padding:    "12px 20px",
        color,
        fontFamily: "Rajdhani",
        fontWeight: 600,
        fontSize:   16,
        animation:  "slideIn 0.3s ease",
        boxShadow:  `0 4px 24px ${color}40`,
      }}
    >
      {toast.msg}
    </div>
  );
}
