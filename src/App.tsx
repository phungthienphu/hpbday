import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import PageShell from './components/PageShell';
import Home from './pages/Home';
import About from './pages/About';
import Menu from './pages/Menu';
import CodeInput from './pages/CodeInput';
import Memories from './pages/Memories';
import LoginModal from './components/LoginModal';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen flex flex-col">
          <main className="flex-1 flex items-center justify-center">
            <Routes>
              <Route
                path="/"
                element={
                  <PageShell>
                    <Home />
                  </PageShell>
                }
              />
              <Route
                path="/about"
                element={
                  <PageShell>
                    <About />
                  </PageShell>
                }
              />
              <Route
                path="/menu"
                element={
                  <PageShell>
                    <Menu />
                  </PageShell>
                }
              />
              <Route
                path="/code-input"
                element={
                  <PageShell>
                    <CodeInput />
                  </PageShell>
                }
              />
              <Route
                path="/memories"
                element={
                  <PageShell>
                    <Memories />
                  </PageShell>
                }
              />
            </Routes>
          </main>

          {/* Floating Login Button & Calendar Modal - Always active */}
          <LoginModal
            isOpen={true}
            onClose={() => {}}
          />

          {/* Footer */}
          <footer className="py-6 text-center text-white/80">
            <div className="container mx-auto px-6">
              <p className="text-sm">
                Made with 🎂 Birthday Event | © 2025 All rights reserved
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
