import { useState } from "react";
import { useGame } from "../Context/GameContext";
import { COLORS, TASK_PRIORITIES } from "../Config/gameConfig";

/**
 * TaskCard — Reusable card for a single task/quest.
 * Props:
 *   task      - task object
 *   onComplete - fn(taskId) called when checkmark clicked
 *   onDelete   - fn(taskId) called when delete clicked
 *   delay      - stagger animation delay (seconds)
 *   completed  - boolean, renders completed style when true
 *   xpFloat    - array of floating XP animations from context
 */
export default function TaskCard({
  task,
  onComplete,
  onDelete,
  delay = 0,
  completed = false,
  xpFloat = [],
}) {
  const priority  = TASK_PRIORITIES.find((p) => p.value === task.priority) || TASK_PRIORITIES[1];
  const [hovered, setHovered] = useState(false);
  const isFloating = xpFloat.some((f) => f.taskId === task.id);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:  completed ? `${COLORS.card}80` : COLORS.card,
        border:      `1px solid ${
          hovered && !completed ? priority.color + "60" : COLORS.border
        }`,
        borderRadius: 12,
        padding:      "14px 18px",
        marginBottom: 10,
        animation:    `fadeInUp 0.35s ease ${delay}s both`,
        transition:   "all 0.2s ease",
        transform:    hovered && !completed ? "translateY(-1px)" : "none",
        boxShadow:    hovered && !completed ? `0 4px 20px ${priority.color}20` : "none",
        opacity:      completed ? 0.6 : 1,
        position:     "relative",
        overflow:     "visible",
      }}
    >
      {/* Floating XP animation */}
      {isFloating && (
        <div
          style={{
            position:     "absolute",
            right:        16,
            top:          -10,
            color:        COLORS.accentGlow,
            fontFamily:   "Rajdhani",
            fontWeight:   700,
            fontSize:     18,
            animation:    "floatUp 1.5s ease forwards",
            pointerEvents: "none",
            zIndex:       10,
          }}
        >
          +{priority.xp} XP
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>

        {/* Complete button or completed icon */}
        {!completed ? (
          <button
            onClick={() => onComplete(task.id)}
            title="Mark complete"
            style={{
              width:        28,
              height:       28,
              borderRadius: "50%",
              border:       `2px solid ${priority.color}`,
              background:   hovered ? priority.color : "transparent",
              boxShadow:    hovered ? `0 0 12px ${priority.color}60` : "none",
              display:      "flex",
              alignItems:   "center",
              justifyContent: "center",
              transition:   "all 0.2s",
              flexShrink:   0,
            }}
          >
            {hovered && <span style={{ color: "#fff", fontSize: 14 }}>✓</span>}
          </button>
        ) : (
          <span style={{ fontSize: 20, flexShrink: 0 }}>✅</span>
        )}

        {/* Task info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontWeight:     600,
              fontSize:       15,
              textDecoration: completed ? "line-through" : "none",
              color:          completed ? COLORS.muted : COLORS.text,
              whiteSpace:     "nowrap",
              overflow:       "hidden",
              textOverflow:   "ellipsis",
            }}
          >
            {task.title}
          </div>

          {/* Tags row */}
          <div style={{ display: "flex", gap: 8, marginTop: 4, flexWrap: "wrap" }}>
            <span
              style={{
                fontSize:   11,
                color:      priority.color,
                background: `${priority.color}20`,
                padding:    "2px 8px",
                borderRadius: 99,
                fontWeight: 600,
              }}
            >
              {priority.icon} {priority.label}
            </span>
            {task.category && (
              <span
                style={{
                  fontSize:     11,
                  color:        COLORS.muted,
                  background:   COLORS.surface,
                  padding:      "2px 8px",
                  borderRadius: 99,
                }}
              >
                {task.category}
              </span>
            )}
            <span
              style={{
                fontSize:     11,
                color:        COLORS.accentGlow,
                background:   `${COLORS.accent}20`,
                padding:      "2px 8px",
                borderRadius: 99,
                fontWeight:   600,
              }}
            >
              ⚡ {priority.xp} XP
            </span>
            {task.dueDate && (
              <span
                style={{
                  fontSize:     11,
                  color:        COLORS.muted,
                  background:   COLORS.surface,
                  padding:      "2px 8px",
                  borderRadius: 99,
                }}
              >
                📅 {task.dueDate}
              </span>
            )}
          </div>
        </div>

        {/* Delete button */}
        {!completed && (
          <button
            onClick={() => onDelete(task.id)}
            title="Delete quest"
            style={{
              color:        COLORS.muted,
              fontSize:     16,
              padding:      4,
              borderRadius: 6,
              transition:   "color 0.2s",
              flexShrink:   0,
            }}
            onMouseEnter={(e) => (e.target.style.color = COLORS.red)}
            onMouseLeave={(e) => (e.target.style.color = COLORS.muted)}
          >
            🗑
          </button>
        )}
      </div>
    </div>
  );
}
