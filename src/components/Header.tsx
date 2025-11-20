import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { logout } from "../features/authSlice";
import DraggableNavItem from "./DraggableNavItem";
import ModalCustom from "./Modal/modalCustom";

interface HeaderProps {
  onNavItemDragStart: (itemId: string) => void;
  onNavItemDragEnd: (itemId: string, hasMoved: boolean) => void;
  onNavItemPositionChange: (itemId: string, x: number, y: number) => void;
  shouldResetItems?: boolean;
}

const Header = ({
  onNavItemDragStart,
  onNavItemDragEnd,
  onNavItemPositionChange,
  shouldResetItems = false,
}: HeaderProps) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const currentPath = useLocation().pathname;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setShowLogoutConfirm(false);
  };

  return (
    <header className="w-full">
      <nav className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-black/10 pb-4">
        {/* Logo + title - không draggable */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-pastel-pink to-pastel-peach rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-all duration-300">
            <span className="text-xl">🎂</span>
          </div>
          <div className="leading-tight">
            <p className="text-[10px] tracking-[0.3em] text-gray-700 uppercase">
              Banner Template
            </p>
            <span className="text-base md:text-lg font-semibold text-gray-900">
              Birthday Event
            </span>
          </div>
        </Link>

        {/* Navigation Links - draggable */}
        <div className="flex items-center flex-wrap justify-end gap-3 sm:gap-6 text-[10px] sm:text-xs tracking-[0.25em] uppercase">
          <DraggableNavItem
            itemId="home"
            to="/"
            onPositionChange={(x, y) => onNavItemPositionChange("home", x, y)}
            onDragStart={() => onNavItemDragStart("home")}
            onDragEnd={(hasMoved) => onNavItemDragEnd("home", hasMoved)}
            shouldReset={shouldResetItems}
            className="text-gray-800 hover:text-gray-900 transition-all duration-200"
          >
            <span className={`text-sm md:text-base lg:text-base ${currentPath === "/" ? "font-bold" : ""}`}>🎂Home</span>
          </DraggableNavItem>

          <DraggableNavItem
            itemId="event"
            to="/menu"
            onPositionChange={(x, y) => onNavItemPositionChange("event", x, y)}
            onDragStart={() => onNavItemDragStart("event")}
            onDragEnd={(hasMoved) => onNavItemDragEnd("event", hasMoved)}
            shouldReset={shouldResetItems}
            className={`text-gray-800 hover:text-gray-900 transition-all duration-200`}
          >
            <span className={`text-sm md:text-base lg:text-base ${currentPath === "/menu" ? "font-bold" : ""}`}>🎂Event</span>
          </DraggableNavItem>

          <DraggableNavItem
            itemId="about"
            to="/about"
            onPositionChange={(x, y) => onNavItemPositionChange("about", x, y)}
            onDragStart={() => onNavItemDragStart("about")}
            onDragEnd={(hasMoved) => onNavItemDragEnd("about", hasMoved)}
            shouldReset={shouldResetItems}
            className="text-gray-800 hover:text-gray-900 transition-all duration-200"
          >
            <span className={`text-sm md:text-base lg:text-base ${currentPath === "/about" ? "font-bold" : ""}`}>🎂About</span>
          </DraggableNavItem>

          {isAuthenticated ? (
            <DraggableNavItem
              itemId="memories"
              to="/memories"
              onPositionChange={(x, y) =>
                onNavItemPositionChange("memories", x, y)
              }
              onDragStart={() => onNavItemDragStart("memories")}
              onDragEnd={(hasMoved) => onNavItemDragEnd("memories", hasMoved)}
              shouldReset={shouldResetItems}
              // onResetComplete={onResetComplete}
              className="text-gray-800 hover:text-gray-900 transition-all duration-200"
            >
              <span className="text-sm md:text-base lg:text-base">
                <span className={`text-sm md:text-base lg:text-base ${currentPath === "/memories" ? "font-bold" : ""}`}>🎂Memories</span>
              </span>
            </DraggableNavItem>
          ) : null}

          {isAuthenticated && (
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="ml-4 bg-gray-900 text-white px-5 py-2 rounded-full text-[10px] md:text-xs tracking-[0.2em] uppercase hover:bg-black transition-all duration-300"
            >
              Sign out
            </button>
          )}
        </div>
      </nav>

      {/* <Transition appear show={showLogoutConfirm} as={Fragment}>
          <Dialog as="div" className="relative z-[100]" onClose={() => setShowLogoutConfirm(false)}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center px-4 py-8">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-200"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-150"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">
                    <Dialog.Title className="text-lg font-semibold text-gray-900 text-center mb-2">
                      Rời khỏi trang?
                    </Dialog.Title>
                    <Dialog.Description className="text-sm text-gray-600 text-center mb-4">
                      Chắc chắn muốn đăng xuất chứ?
                    </Dialog.Description>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setShowLogoutConfirm(false)}
                        className="py-2 rounded-2xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
                      >
                        Ở lại
                      </button>
                      <button
                        onClick={handleLogout}
                        className="py-2 rounded-2xl bg-gray-900 text-white font-semibold hover:bg-black transition"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition> */}
      <ModalCustom
        title="Rời khỏi trang?"
        description="Chắc chắn muốn đăng xuất chứ?"
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
