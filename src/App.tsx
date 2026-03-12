import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  useLocation,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import MonsterUnified from "./components/MonsterUnified";
import { MonsterProvider } from "./contexts/MonsterContext";
import Snowfall from "react-snowfall";
import LoadingComponent from "./components/loading";
import Notification from "./components/Notification";
import AudioProvider from "./components/AudioProvider";
import { ButtonAudio } from "./components/ButtonAnimation/AudioButton";
import AppRoutes from "./routes";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { fetchMe } from "./features/authSlice";

const FULLSCREEN_PATHS = ["/event-page", "/start-game", ""];

function AppContent() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const isFullscreen = FULLSCREEN_PATHS.includes(location.pathname);

  // Fetch user profile when authenticated (on mount and after login)
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchMe());
    }
  }, [isAuthenticated, dispatch]);

  const isMonsterPage = !isFullscreen;
  const [monsterHidden, setMonsterHidden] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Snowfall style={{ zIndex: 1000 }} />
      <Notification />
      {!isMonsterPage && <ButtonAudio />}

      <main className="flex-1 flex justify-center">
        <AppRoutes />
      </main>

      {isMonsterPage && !monsterHidden && <MonsterUnified />}

      {/* Monster toggle button */}
      {isMonsterPage && (
        <button
          onClick={() => setMonsterHidden((h) => !h)}
          className="fixed bottom-4 right-4 z-50 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-primary-100 shadow-soft flex items-center justify-center text-lg hover:shadow-elevated hover:scale-105 active:scale-95 transition-all duration-200"
          title={monsterHidden ? "Hiện Monster" : "Ẩn Monster"}
        >
          {monsterHidden ? "👻" : "🙈"}
        </button>
      )}
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AudioProvider>
        <Router>
          <MonsterProvider>
            <LoadingComponent />
            <AppContent />
          </MonsterProvider>
        </Router>
      </AudioProvider>
    </Provider>
  );
}

export default App;
