import type { ReactNode } from 'react';
import Header from './Header';

interface PageShellProps {
  children: ReactNode;
  onNavItemDragStart: (itemId: string) => void;
  onNavItemDragEnd: (itemId: string, hasMoved: boolean) => void;
  onNavItemPositionChange: (itemId: string, x: number, y: number) => void;
  shouldResetItems?: boolean;
}

const PageShell = ({
  children,
  onNavItemDragStart,
  onNavItemDragEnd,
  onNavItemPositionChange,
  shouldResetItems = false,
}: PageShellProps) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-3 sm:px-4 py-6 sm:py-10">
      <div className="max-w-7xl w-full">
        <div className="card bg-gradient-to-r from-pastel-pink/80 via-pastel-peach/80 to-pastel-blue/80 shadow-2xl rounded-3xl px-4 sm:px-6 md:px-10 pt-6 pb-8 sm:pb-10">
          <Header
            onNavItemDragStart={onNavItemDragStart}
            onNavItemDragEnd={onNavItemDragEnd}
            onNavItemPositionChange={onNavItemPositionChange}
            shouldResetItems={shouldResetItems}
          />

          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default PageShell;
