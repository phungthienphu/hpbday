import { useAppSelector } from "../store/hooks";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const sections = [
  {
    to: "/code-input",
    icon: "💌",
    title: "Nhập mã lời chúc",
    description: "Nhập các mã em cào trúng và nhận thông điệp từ anh nhé!",
    hint: "Mỗi mã là một lời yêu thương",
  },
];

const Menu = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return (
      <div className="max-w-lg mx-auto py-8 sm:py-16 text-center px-1">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="card py-10 sm:py-12"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-5 bg-primary-50 rounded-2xl flex items-center justify-center">
            <span className="text-2xl sm:text-3xl">🔒</span>
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-surface-800 mb-2">Đăng nhập để tiếp tục</h1>
          <p className="text-sm text-surface-500 mb-6 max-w-xs mx-auto">
            Đăng nhập để mở khóa form nhập mã lời chúc và gallery kỷ niệm.
          </p>
          <Link to="/login" className="btn-primary">Đăng nhập</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-5 sm:mb-6"
      >
        <h1 className="text-xl sm:text-2xl font-bold text-surface-800">Event</h1>
        <p className="text-sm text-surface-500 mt-0.5">
          Chọn một mục bên dưới để xem lời chúc và kỷ niệm sinh nhật.
        </p>
      </motion.div>

      <div className="space-y-3">
        {sections.map((section, index) => (
          <motion.div
            key={section.to}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * (index + 1) }}
          >
            <Link to={section.to}>
              <div className="card-interactive flex items-center gap-3 sm:gap-4 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary-50 flex items-center justify-center text-xl sm:text-2xl flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                  {section.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-surface-800 text-sm sm:text-base">{section.title}</h2>
                  <p className="text-xs sm:text-sm text-surface-500 mt-0.5 line-clamp-2">{section.description}</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-200 group-hover:text-primary-400 group-hover:translate-x-0.5 transition-all flex-shrink-0"><polyline points="9 18 15 12 9 6"/></svg>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
