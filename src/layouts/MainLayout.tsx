import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 py-2 sm:py-4 relative">
      <Header />
      <main className="mt-3 sm:mt-5 bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-primary-100/40 p-4 sm:p-6 md:p-8 mb-6 min-h-[60vh]"
        style={{ boxShadow: '0 0 0 1px rgba(253,164,175,0.08), 0 4px 24px rgba(244,63,94,0.04)' }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
