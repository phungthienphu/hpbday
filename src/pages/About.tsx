import { Link } from "react-router-dom";

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
              Happy Birthday to you!
            </h1>
            <p className="text-sm text-gray-700 max-w-xl">
              Đây là một sản phẩm nho nhỏ anh làm tặng cho bé nhân ngày sinh
              nhật em.
            </p>
          </div>

          <div className="mt-2 md:mt-0 flex items-center gap-4 justify-center md:justify-end">
            <div className="text-5xl">🎂</div>
            <div className="text-sm text-right">
              <p className="font-semibold text-gray-800">Sinh nhật</p>
              <p className="text-gray-700">Người anh iu nhấtt</p>
            </div>
          </div>
        </div>

        {/* Sections */}
        
        <div className="grid gap-6 animate-slide-up sm:grid-cols-2 lg:grid-cols-3">
        <div className="card">
            <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-gray-500 mb-3">
              Trang web gồmm
            </h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Nhập mã để mở lời nhắn,thông điệp yêu thương hoặc món quà từ anh</li>
              <li>• Xem thư viện ảnh kỉ niệm của chúng mình, của em</li>
              {/* <li>• Giao diện pastel, animation mượt mà</li> */}
            </ul>
          </div>
          <div className="card">
            <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-gray-500 mb-3">
              Liên hệ
            </h3>
            <div className="text-sm text-gray-700 leading-relaxed space-y-2">
              <div className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <img src="/facebook.png" alt="Facebook" className="w-5 h-5" />
                  Facebook
                </div>
                <Link
                  to="https://www.facebook.com/phu.tuila.50/"
                  target="_blank"
                  className="flex items-center gap-2 hover:text-pastel-pink transition-all duration-300"
                >
                  Tại đây
                </Link>
              </div>
              <div className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src="/instagram.png"
                    alt="Instagram"
                    className="w-5 h-5"
                  />
                  <span>Instagram</span>
                </div>
                <Link
                  to="https://www.instagram.com/thien_phuuuuu/"
                  target="_blank"
                  className="flex items-center gap-2 hover:text-pastel-pink transition-all duration-300"
                >
                  {/* <img src="/instagram.png" alt="Instagram" className="w-5 h-5" /> */}
                  Tại đây
                </Link>
              </div>
              <div className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <img src="/phone-call.png" alt="Phone" className="w-5 h-5" />
                  <span>Phone</span>
                </div>
                <Link
                  to="tel:0964870561"
                  target="_blank"
                  className="flex items-center gap-2 hover:text-pastel-pink transition-all duration-300"
                >
                  Tại đây
                </Link>
              </div>
            </div>
          </div>

          

          {/* <div className="card">
           
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default About;
