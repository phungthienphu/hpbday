import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12 lg:gap-16 py-4 sm:py-8 md:py-12">
      {/* Left */}
      <div className="md:w-1/2 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-primary-100/80 text-primary-500 text-xs font-semibold tracking-wide uppercase">
            Birthday
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-surface-800 leading-[1.1] mt-3 mb-4">
            Happy Birthday
            <br />
            <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              To My Baby!
            </span>
          </h1>

          <p className="text-sm text-surface-400 flex items-center gap-2 justify-center md:justify-start">
            <span className="w-6 h-px bg-primary-200" />
            Friday, Dec 05, 2025
            <span className="w-6 h-px bg-primary-200" />
          </p>

          <p className="mt-4 sm:mt-5 text-surface-600 text-sm sm:text-[15px] leading-relaxed max-w-md mx-auto md:mx-0">
            Đây là một sản phẩm nhỏ anh làm tặng cho em nhân ngày sinh nhật em,
            nó cũm hong có gì cả, chỉ là anh muốn làm gì đó khác thường xíu,
            em nghịch nghịch có gì khum hiểu gõ anh nhaa!
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 sm:mt-7 flex gap-3 justify-center md:justify-start"
          >
            <Link to="/menu" className="btn-primary">
              Khám phá ngay
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Right */}
      <motion.div
        className="md:w-1/2"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <div className="relative aspect-[4/3] w-full max-w-md mx-auto md:max-w-none overflow-hidden rounded-2xl shadow-elevated group">
          <img
            src="./image.png"
            alt="Birthday celebration"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-600/20 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
            <span className="text-white/90 text-xs sm:text-sm font-medium backdrop-blur-md bg-white/10 rounded-lg px-2.5 py-1 sm:px-3 sm:py-1.5 border border-white/20">
              Made with love
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
