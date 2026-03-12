import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../features/authSlice";
import ModalCustom from "./Modal/modalCustom";

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Event" },
  { to: "/start-game", label: "Valentine", fullscreen: true },
  { to: "/about", label: "About" },
];

const AUTH_NAV_ITEMS = [
  { to: "/memories", label: "Memories" },
  { to: "/items", label: "Wishlist" },
];

const Header = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setShowLogoutConfirm(false);
  };

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const allNavItems = [
    ...NAV_ITEMS,
    ...(isAuthenticated ? AUTH_NAV_ITEMS : []),
  ];

  return (
    <header className="w-full">
      <nav className="flex items-center justify-between py-3 sm:py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group flex-shrink-0 z-50">
          <div className="w-9 h-9 bg-gradient-to-br from-primary-400 to-accent-400 rounded-xl flex items-center justify-center shadow-soft group-hover:shadow-glow transition-shadow duration-300">
            <span className="text-base">🎂</span>
          </div>
          <span className="text-base font-bold text-surface-800 hidden sm:block">
            Birthday
          </span>
        </Link>

        {/* Desktop nav — hidden on mobile */}
        <div className="hidden md:flex items-center gap-1">
          {allNavItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`px-3 lg:px-4 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200 ${
                isActive(item.to)
                  ? "bg-primary-100/80 text-primary-600"
                  : "text-surface-500 hover:text-primary-500 hover:bg-primary-50/60"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 flex-shrink-0 z-50">
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-primary-200 hover:ring-primary-400 transition-all duration-200"
              >
                {user?.avatarUrl ? (
                  <img src={user.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary-300 to-accent-300 flex items-center justify-center text-white text-xs font-bold">
                    {(user?.name || user?.username || "U").charAt(0).toUpperCase()}
                  </div>
                )}
              </Link>
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="btn-ghost text-xs hidden sm:inline-flex"
              >
                Thoát
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-primary text-xs !py-2 !px-4">
              Đăng nhập
            </Link>
          )}

          {/* Hamburger — mobile/tablet only */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-surface-600 hover:bg-primary-50 transition-colors"
            aria-label="Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {mobileMenuOpen ? (
                <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              ) : (
                <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              onClick={closeMobileMenu}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute left-3 right-3 top-16 z-50 md:hidden"
            >
              <div className="bg-white/95 backdrop-blur-lg rounded-2xl border border-primary-100 shadow-elevated overflow-hidden">
                <div className="p-3 space-y-1">
                  {allNavItems.map((item, index) => (
                    <motion.div
                      key={item.to}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                    >
                      <Link
                        to={item.to}
                        onClick={closeMobileMenu}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 ${
                          isActive(item.to)
                            ? "bg-primary-50 text-primary-600"
                            : "text-surface-700 hover:bg-primary-50/50 hover:text-primary-500"
                        }`}
                      >
                        {item.label}
                        {isActive(item.to) && (
                          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-400" />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile logout */}
                {isAuthenticated && (
                  <div className="border-t border-primary-100/60 p-3">
                    <button
                      onClick={() => { closeMobileMenu(); setShowLogoutConfirm(true); }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-surface-500 hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ModalCustom
        title="Đăng xuất?"
        description="Bạn có chắc muốn đăng xuất?"
        textLeft="Ở lại"
        textRight="Đăng xuất"
        show={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onSubmit={handleLogout}
      />
    </header>
  );
};

export default Header;
