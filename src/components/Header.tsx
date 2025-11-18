import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { logout } from '../features/authSlice';
import DraggableNavItem from './DraggableNavItem';

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

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="w-full">
      <nav className="flex items-center justify-between border-b border-black/10 pb-4">
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
        <div className="flex items-center space-x-6 text-xs md:text-sm tracking-[0.25em] uppercase">
          <DraggableNavItem
            itemId="home"
            to="/"
            onPositionChange={(x, y) => onNavItemPositionChange('home', x, y)}
            onDragStart={() => onNavItemDragStart('home')}
            onDragEnd={(hasMoved) => onNavItemDragEnd('home', hasMoved)}
            shouldReset={shouldResetItems}
            className="text-gray-800 hover:text-gray-900 transition-all duration-200"
          >
            🎂 Home
          </DraggableNavItem>

          <DraggableNavItem
            itemId="event"
            to="/menu"
            onPositionChange={(x, y) => onNavItemPositionChange('event', x, y)}
            onDragStart={() => onNavItemDragStart('event')}
            onDragEnd={(hasMoved) => onNavItemDragEnd('event', hasMoved)}
            shouldReset={shouldResetItems}
            className="text-gray-800 hover:text-gray-900 transition-all duration-200"
          >
           🎂 Event
          </DraggableNavItem>

          <DraggableNavItem
            itemId="about"
            to="/about"
            onPositionChange={(x, y) => onNavItemPositionChange('about', x, y)}
            onDragStart={() => onNavItemDragStart('about')}
            onDragEnd={(hasMoved) => onNavItemDragEnd('about', hasMoved)}
            shouldReset={shouldResetItems}
            className="text-gray-800 hover:text-gray-900 transition-all duration-200"
          >
           🎂 About
          </DraggableNavItem>

          {isAuthenticated ? (
            <DraggableNavItem
              itemId="memories"
              to="/memories"
              onPositionChange={(x, y) => onNavItemPositionChange('memories', x, y)}
              onDragStart={() => onNavItemDragStart('memories')}
              onDragEnd={(hasMoved) => onNavItemDragEnd('memories', hasMoved)}
              shouldReset={shouldResetItems}
              // onResetComplete={onResetComplete}
              className="text-gray-800 hover:text-gray-900 transition-all duration-200"
            >
             🎂 Memories
            </DraggableNavItem>
          ) : null}

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="ml-4 bg-gray-900 text-white px-5 py-2 rounded-full text-[10px] md:text-xs tracking-[0.2em] uppercase hover:bg-black transition-all duration-300"
            >
              Sign out
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
