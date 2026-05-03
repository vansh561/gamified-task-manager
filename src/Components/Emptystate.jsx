import { COLORS } from "../Config/gameConfig";

/**
 * EmptyState — shown when a list has no items.
 * Props: icon (emoji), msg (string)
 */
export default function EmptyState({ icon, msg }) {
  return (
    <div
      style={{
        textAlign:    "center",
        padding:      "40px 20px",
        color:        COLORS.muted,
        border:       `1px dashed ${COLORS.border}`,
        borderRadius: 12,
      }}
    >
      <div style={{ fontSize: 40, marginBottom: 12 }}>{icon}</div>
      <div style={{ fontSize: 14 }}>{msg}</div>
    </div>
  );
}
