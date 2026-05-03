import { useState } from "react";
import { useGame } from "../Context/GameContext";
import { COLORS, TASK_PRIORITIES, CATEGORIES } from "../Config/gameConfig";
import TaskCard   from "../Components/Taskcard";
import EmptyState from "../Components/Emptystate";

/**
 * Tasks — Quest Board page with add form, filters, and task list.
 */
export default function Tasks() {
  const { tasks, addTask, completeTask, deleteTask, xpFloat } = useGame();

  // ── Local state ───────────────────────────────────────────────────────────
  const [filter,   setFilter  ] = useState("all");
  const [sortBy,   setSortBy  ] = useState("newest");
  const [showForm, setShowForm] = useState(false);
  const [form,     setForm    ] = useState({
    title: "", priority: "medium", category: "Personal", dueDate: "",
  });
  const [error, setError] = useState("");

  // ── Add Task ──────────────────────────────────────────────────────────────
  const handleAdd = () => {
    if (!form.title.trim()) { setError("Quest title required!"); return; }
    addTask(form);
    setForm({ title: "", priority: "medium", category: "Personal", dueDate: "" });
    setShowForm(false);
    setError("");
  };

  // ── Filter + Sort ─────────────────────────────────────────────────────────
  let filtered = tasks.filter((t) => {
    if (filter === "active")    return !t.completed;
    if (filter === "completed") return  t.completed;
    return true;
  });

  filtered = [...filtered].sort((a, b) => {
    if (sortBy === "newest") return b.createdAt - a.createdAt;
    if (sortBy === "xp") {
      const pa = TASK_PRIORITIES.find((p) => p.value === a.priority)?.xp || 0;
      const pb = TASK_PRIORITIES.find((p) => p.value === b.priority)?.xp || 0;
      return pb - pa;
    }
    return 0;
  });

  // ── Shared input style ────────────────────────────────────────────────────
  const inputStyle = {
    background:   COLORS.surface,
    border:       `1px solid ${COLORS.border}`,
    borderRadius: 8,
    padding:      "10px 12px",
    color:        COLORS.text,
    fontSize:     14,
  };

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div
        style={{
          display:        "flex",
          justifyContent: "space-between",
          alignItems:     "center",
          marginBottom:   20,
        }}
      >
        <h1 style={{ fontFamily: "Rajdhani", fontWeight: 700, fontSize: 26 }}>
          Quest Board
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            background:   `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentGlow})`,
            color:        "#fff",
            padding:      "10px 20px",
            borderRadius: 10,
            fontFamily:   "Rajdhani",
            fontWeight:   700,
            fontSize:     15,
            boxShadow:    `0 4px 16px ${COLORS.accent}50`,
            transition:   "transform 0.15s, box-shadow 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.04)";
            e.currentTarget.style.boxShadow = `0 6px 24px ${COLORS.accent}70`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = `0 4px 16px ${COLORS.accent}50`;
          }}
        >
          {showForm ? "✕ Cancel" : "+ New Quest"}
        </button>
      </div>

      {/* ── Add Task Form ───────────────────────────────────────────────── */}
      {showForm && (
        <div
          style={{
            background:   COLORS.card,
            border:       `1px solid ${COLORS.accent}50`,
            borderRadius: 16,
            padding:      20,
            marginBottom: 20,
            animation:    "fadeInUp 0.3s ease",
          }}
        >
          <div
            style={{
              fontFamily:   "Rajdhani",
              fontWeight:   700,
              fontSize:     18,
              marginBottom: 16,
              color:        COLORS.accentGlow,
            }}
          >
            ⚔️ New Quest
          </div>

          {/* Error message */}
          {error && (
            <div
              style={{
                color:        COLORS.red,
                fontSize:     13,
                marginBottom: 10,
                animation:    "shake 0.3s ease",
              }}
            >
              {error}
            </div>
          )}

          {/* Title input */}
          <input
            placeholder="Quest title..."
            value={form.title}
            onChange={(e) => { setForm((f) => ({ ...f, title: e.target.value })); setError(""); }}
            style={{ ...inputStyle, width: "100%", fontSize: 15, marginBottom: 12, outline: "none" }}
            onFocus={(e) => (e.target.style.borderColor = COLORS.accent)}
            onBlur={(e)  => (e.target.style.borderColor = COLORS.border)}
          />

          {/* Priority / Category / Due Date */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            <select
              value={form.priority}
              onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value }))}
              style={inputStyle}
            >
              {TASK_PRIORITIES.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.icon} {p.label} ({p.xp} XP)
                </option>
              ))}
            </select>

            <select
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              style={inputStyle}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
              style={inputStyle}
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleAdd}
            style={{
              marginTop:    14,
              width:        "100%",
              padding:      "12px",
              background:   `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentGlow})`,
              color:        "#fff",
              borderRadius: 10,
              fontFamily:   "Rajdhani",
              fontWeight:   700,
              fontSize:     16,
            }}
          >
            Add Quest ⚔️
          </button>
        </div>
      )}

      {/* ── Filter + Sort Bar ───────────────────────────────────────────── */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {["all", "active", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding:      "7px 16px",
              borderRadius: 99,
              background:   filter === f ? COLORS.accent  : COLORS.card,
              border:       `1px solid ${filter === f ? COLORS.accent : COLORS.border}`,
              color:        filter === f ? "#fff"         : COLORS.muted,
              fontSize:     13,
              fontWeight:   600,
              textTransform: "capitalize",
              transition:   "all 0.2s",
            }}
          >
            {f}
          </button>
        ))}

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            marginLeft:   "auto",
            background:   COLORS.card,
            border:       `1px solid ${COLORS.border}`,
            borderRadius: 8,
            padding:      "6px 12px",
            color:        COLORS.text,
            fontSize:     13,
          }}
        >
          <option value="newest">Newest</option>
          <option value="xp">Highest XP</option>
        </select>
      </div>

      {/* ── Task List ───────────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <EmptyState
          icon="🏰"
          msg={filter === "completed" ? "No completed quests yet." : "No quests found. Add one!"}
        />
      ) : (
        filtered.map((task, i) => (
          <TaskCard
            key={task.id}
            task={task}
            onComplete={completeTask}
            onDelete={deleteTask}
            delay={i * 0.04}
            completed={task.completed}
            xpFloat={xpFloat}
          />
        ))
      )}
    </div>
  );
}
