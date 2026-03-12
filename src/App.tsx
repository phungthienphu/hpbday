import { useEffect } from "react";
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

  // Fetch user profile on mount if token exists
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchMe());
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const isMonsterVisible = !isFullscreen;

  return (
    <div className="min-h-screen flex flex-col">
      <Snowfall style={{ zIndex: 1000 }} />
      <Notification />
      {!isMonsterVisible && <ButtonAudio />}

      <main className="flex-1 flex justify-center">
        <AppRoutes />
      </main>

      {isMonsterVisible && <MonsterUnified />}
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
