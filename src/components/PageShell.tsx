import { ReactNode } from 'react';
import Header from './Header';

interface PageShellProps {
  children: ReactNode;
}

const PageShell = ({ children }: PageShellProps) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="max-w-7xl w-full">
        <div className="card bg-gradient-to-r from-pastel-pink/80 via-pastel-peach/80 to-pastel-blue/80 shadow-2xl px-6 md:px-10 pt-6 pb-10">
          <Header />

          <div className="mt-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageShell;


