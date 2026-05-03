import { GameProvider, useGame } from "./Context/GameContext";
import { COLORS } from "./Config/gameConfig";
import "./styles/global.css";

// Components
import Navbar       from "./Components/Navbar";
import TopBar       from "./Components/Topbar";
import Toast        from "./Components/Toast";
import LevelUpModal from "./Components/LevelupModal";

// Pages
import Dashboard   from "./Pages/Dashboard";
import Tasks       from "./Pages/Tasks";
import Achievements from "./Pages/Achievements";
import Profile     from "./Pages/Profile";

// ─── Page Router ─────────────────────────────────────────────────────────────
const PAGE_MAP = {
  dashboard:    Dashboard,
  tasks:        Tasks,
  achievements: Achievements,
  profile:      Profile,
};

function AppContent() {
  const { page, toast, levelUpAnim } = useGame();
  const Page = PAGE_MAP[page] || Dashboard;

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg }}>

      {/* CRT scanline overlay */}
      <div
        style={{
          position:       "fixed",
          inset:          0,
          pointerEvents:  "none",
          zIndex:         0,
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
        }}
      />

      {/* Sticky header */}
      <TopBar />

      {/* Main content area */}
      <main
        style={{
          maxWidth:  560,
          margin:    "0 auto",
          padding:   "20px 16px 100px",
          position:  "relative",
          zIndex:    1,
        }}
      >
        <Page />
      </main>

      {/* Bottom navigation */}
      <Navbar />

      {/* Overlays */}
      <Toast toast={toast} />
      <LevelUpModal levelUpAnim={levelUpAnim} />
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}
