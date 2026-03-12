import { motion } from "framer-motion";

const contactLinks = [
  {
    icon: "/facebook.png",
    label: "Facebook",
    href: "https://www.facebook.com/phu.tuila.50/",
  },
  {
    icon: "/instagram.png",
    label: "Instagram",
    href: "https://www.instagram.com/thien_phuuuuu/",
  },
  {
    icon: "/phone-call.png",
    label: "Phone",
    href: "tel:0964870561",
  },
];

const About = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-5 sm:mb-6"
      >
        <h1 className="text-xl sm:text-2xl font-bold text-surface-800">About</h1>
        <p className="text-sm text-surface-500 mt-0.5">
          Đây là một sản phẩm nho nhỏ anh làm tặng cho bé nhân ngày sinh nhật em.
        </p>
      </motion.div>

      <div className="grid gap-3 sm:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="card"
        >
          <h3 className="section-title mb-3">Trang web gồm</h3>
          <ul className="text-sm text-surface-600 space-y-3">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 w-5 h-5 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">1</span>
              Nhập mã để mở lời nhắn, thông điệp yêu thương hoặc món quà từ anh
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 w-5 h-5 rounded-full bg-accent-100 text-accent-500 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">2</span>
              Xem thư viện ảnh kỉ niệm của chúng mình, của em
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="card"
        >
          <h3 className="section-title mb-3">Liên hệ</h3>
          <div className="space-y-1">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-primary-50/50 transition-colors duration-150 group"
              >
                <img src={link.icon} alt={link.label} className="w-5 h-5" />
                <span className="text-sm text-surface-700 flex-1">{link.label}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-200 group-hover:text-primary-400 group-hover:translate-x-0.5 transition-all"><polyline points="9 18 15 12 9 6"/></svg>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
