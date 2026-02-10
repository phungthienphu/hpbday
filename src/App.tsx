import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import confetti from 'canvas-confetti';
import { store } from './store/store';
import PageShell from './components/PageShell';
import Home from './pages/Home';
import About from './pages/About';
import Menu from './pages/Menu';
import CodeInput from './pages/CodeInput/CodeInput';
import Memories from './pages/Memories/Memories';
import LoginModal from './components/LoginModal';
import MonsterUnified from './components/MonsterUnified';
import { MonsterProvider } from './contexts/MonsterContext';
import { useMonsterFeed } from './hooks/useMonsterFeed';
import { useTutorial } from './hooks/useTutorial';
import Snowfall from 'react-snowfall'
import LoadingComponent from './components/loading/index.';
import Notification from './components/Notification';
import EventPage from './pages/EventValentine';
import StartScreen from './pages/EventValentine/StartScreen';
import AudioProvider from './components/AudioProvider';


// Map itemId to route
const NAV_ROUTES: Record<string, string> = {
  home: '/',
  event: '/menu',
  about: '/about',
  memories: '/memories',
};

function AppContent() {
  const navigate = useNavigate();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [shouldResetItems, setShouldResetItems] = useState(false);
  const { showTutorial, hideTutorial } = useTutorial();
  const hasEventPage = window.location.pathname === '/event-page'||window.location.pathname === '/start-game';



  const {
    updateNavItemPosition,
    startDragging,
    endDragging,
    onFeedingComplete,
  } = useMonsterFeed();

  // Handle navigation when monster eats nav item
  useEffect(() => {
    onFeedingComplete((itemId) => {
      // Confetti effect
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { x: 0.5, y: 0.3 },
        colors: ['#FFA500', '#FFD700', '#FF6347'],
      });

      // Navigate sau 300ms
      setTimeout(() => {
        const route = NAV_ROUTES[itemId];
        if (route) {
          navigate(route);
          // Trigger reset sau khi navigate (đợi DOM update)
          setTimeout(() => {
            setShouldResetItems(true);
            // Tự động tắt reset sau animation hoàn thành
            setTimeout(() => {
              setShouldResetItems(false);
            }, 600);
          }, 100);
        }
      }, 300);
    });
  }, [navigate, onFeedingComplete]);

  // Auto hide tutorial after 15s
  useEffect(() => {
    if (showTutorial) {
      const timer = setTimeout(() => hideTutorial(), 15000);
      return () => clearTimeout(timer);
    }
  }, [showTutorial, hideTutorial]);

  const handleNavItemDragStart = (itemId: string) => {
    startDragging(itemId);
    if (showTutorial) {
      hideTutorial();
    }
  };

  const handleNavItemDragEnd = (itemId: string, hasMoved: boolean) => {
    endDragging(itemId, hasMoved);
  };

  const handleNavItemPositionChange = (itemId: string, x: number, y: number) => {
    updateNavItemPosition(itemId, x, y);
  };

  // Monster visible: ẩn khi calendar mở
  const isMonsterVisible = !isCalendarOpen;

  return (
    <div className="min-h-screen  flex flex-col">
      <Snowfall style={{ zIndex: 1000 }} />
      <Notification />

      <main className="flex-1 flex items-center justify-center">
        <Routes>
          <Route
            path="/"
            element={
              <PageShell
                onNavItemDragStart={handleNavItemDragStart}
                onNavItemDragEnd={handleNavItemDragEnd}
                onNavItemPositionChange={handleNavItemPositionChange}
                shouldResetItems={shouldResetItems}
              >
                <Home />
              </PageShell>
            }
          />
          <Route
            path="/about"
            element={
              <PageShell
                onNavItemDragStart={handleNavItemDragStart}
                onNavItemDragEnd={handleNavItemDragEnd}
                onNavItemPositionChange={handleNavItemPositionChange}
                shouldResetItems={shouldResetItems}
              >
                <About />
              </PageShell>
            }
          />
          <Route
            path="/menu"
            element={
              <PageShell
                onNavItemDragStart={handleNavItemDragStart}
                onNavItemDragEnd={handleNavItemDragEnd}
                onNavItemPositionChange={handleNavItemPositionChange}
                shouldResetItems={shouldResetItems}
              >
                <Menu />
              </PageShell>
            }
          />
          <Route
            path="/code-input"
            element={
              <PageShell
                onNavItemDragStart={handleNavItemDragStart}
                onNavItemDragEnd={handleNavItemDragEnd}
                onNavItemPositionChange={handleNavItemPositionChange}
                shouldResetItems={shouldResetItems}
              >
                <CodeInput />
              </PageShell>
            }
          />
          <Route
            path="/memories"
            element={
              <PageShell
                onNavItemDragStart={handleNavItemDragStart}
                onNavItemDragEnd={handleNavItemDragEnd}
                onNavItemPositionChange={handleNavItemPositionChange}
                shouldResetItems={shouldResetItems}
              >
                <Memories />
              </PageShell>
            }
          />
          <Route
            path="/start-game"
            element={
              // <PageShell
              //   onNavItemDragStart={handleNavItemDragStart}
              //   onNavItemDragEnd={handleNavItemDragEnd}
              //   onNavItemPositionChange={handleNavItemPositionChange}
              //   shouldResetItems={shouldResetItems}
              // >
              <StartScreen />
              // </PageShell>
            }
          />
          <Route
            path="/event-page"
            element={
              // <PageShell
              //   onNavItemDragStart={handleNavItemDragStart}
              //   onNavItemDragEnd={handleNavItemDragEnd}
              //   onNavItemPositionChange={handleNavItemPositionChange}
              //   shouldResetItems={shouldResetItems}
              // >
              <EventPage />
              // </PageShell>
            }
          />
        </Routes>
      </main>

      {/* Monster - 1 con duy nhất, luôn ở đây */}
      {isMonsterVisible && !hasEventPage && <MonsterUnified />}

      {/* Tutorial Hint */}
      {/* {showTutorial && isMonsterVisible && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-gradient-to-r from-orange-400 to-amber-500 text-white px-6 py-3 rounded-2xl shadow-xl">
            <p className="text-sm font-semibold flex items-center gap-2">
              <span className="text-2xl">👆</span>
              Kéo các mục menu vào miệng quái vật để chuyển trang!
              <span className="text-2xl">🎂👾</span>
            </p>
          </div>
        </div>
      )} */}

      {/* Login Modal */}
      <LoginModal
        isOpen={true}
        onClose={() => setIsCalendarOpen(false)}
        onCalendarOpen={() => setIsCalendarOpen(true)}
        onCalendarClose={() => setIsCalendarOpen(false)}
      />

      {/* Footer */}
      {/* <footer className="py-6 text-center text-white/80">
        <div className="container mx-auto px-6">
          <p className="text-sm">
            Made with 🎂 Birthday Event | © 2025 All rights reserved
          </p>
        </div>
      </footer> */}
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
