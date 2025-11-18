const About = () => {
  return (
    <div className="container mx-auto  lg:px-4 md:px-4 px:1 lg:py-12 md:py-12 py-6">
      <div className="max-w-5xl mx-auto">
        {/* Header banner style */}
        <div className="card animate-fade-in bg-gradient-to-r from-pastel-pink/80 via-pastel-purple/70 to-pastel-blue/80 shadow-2xl mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-xs tracking-[0.3em] uppercase text-gray-700 mb-2">
              About
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2">
              Birthday Greeting Page
            </h1>
            <p className="text-sm text-gray-700 max-w-xl">
              Một trang web nhỏ gọn, hiện đại để gom tất cả lời chúc, lời nhắn và
              kỷ niệm cho ngày sinh nhật của một người đặc biệt.
            </p>
          </div>

          <div className="mt-2 md:mt-0 flex items-center gap-4 justify-center md:justify-end">
            <div className="text-5xl">🎂</div>
            <div className="text-sm text-right">
              <p className="font-semibold text-gray-800">Banner Template</p>
              <p className="text-gray-700">Birthday Edition</p>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="grid gap-6 animate-slide-up sm:grid-cols-2 lg:grid-cols-3">
          <div className="card">
            <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-gray-500 mb-3">
              Mục đích
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Tạo một nơi tập trung tất cả lời chúc, thông điệp bí mật và hình ảnh
              kỷ niệm dành cho nhân vật chính trong ngày sinh nhật.
            </p>
          </div>

          <div className="card">
            <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-gray-500 mb-3">
              Tính năng
            </h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Nhập mã để mở lời chúc ẩn</li>
              <li>• Xem gallery kỷ niệm theo phong cách banner</li>
              <li>• Giao diện pastel, animation mượt mà</li>
            </ul>
          </div>

          <div className="card">
            <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-gray-500 mb-3">
              Kỹ thuật
            </h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• React + Vite + TypeScript</li>
              <li>• TailwindCSS + custom animations</li>
              <li>• Redux Toolkit cho state codes & memories</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

