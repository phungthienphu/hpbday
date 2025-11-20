import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { Link } from 'react-router-dom';

const Menu = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 py-10">
        <div className="max-w-4xl w-full">
          <div className="card animate-fade-in bg-gradient-to-r from-pastel-pink/80 via-pastel-peach/80 to-pastel-blue/80 shadow-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="md:w-2/3 pr-0 md:pr-8 text-center md:text-left">
              <p className="text-xs tracking-[0.3em] uppercase text-gray-700 mb-3">
                Event
              </p>
              <h1 className="text-3xl font-semibold text-gray-900 mb-3">
                Unlock the birthday sections
              </h1>
              <p className="text-sm text-gray-700 mb-4">
                Đăng nhập để mở khóa form nhập mã lời chúc và gallery kỷ niệm của
                nhân vật chính trong ngày sinh nhật.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="bg-white/60 rounded-xl p-4">
                  <h3 className="font-semibold mb-2">💌 Mã lời chúc</h3>
                  <p>
                    Mỗi mã tương ứng với một lời chúc sinh nhật riêng, nội dung chỉ
                    xuất hiện khi nhập đúng.
                  </p>
                </div>
                <div className="bg-white/60 rounded-xl p-4">
                  <h3 className="font-semibold mb-2">📸 Kỷ niệm</h3>
                  <p>
                    Bộ sưu tập ảnh sinh nhật và những khoảnh khắc đáng nhớ xung
                    quanh người được chúc.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-2 md:mt-0 md:w-1/3 flex md:flex-col items-center justify-center gap-4">
              <div className="text-6xl">🔒</div>
              <Link to="/" className="btn-primary">
                Đăng nhập để tiếp tục
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto  lg:px-4 md:px-4 px:1 lg:py-12 md:py-12 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="card text-center lg:mb-8 md:mb-8 mb-4 animate-fade-in bg-gradient-to-r from-pastel-pink/80 via-pastel-peach/80 to-pastel-blue/80">
          <h1 className="lg:text-3xl lg:font-bold md:text-4xl md:font-bold text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pastel-pink to-pastel-purple mb-4">
            ✨ Birthday sections ✨
          </h1>
          <p className="text-base text-gray-700 px-3 lg:px-0">
            Chọn một trong những mục bên dưới để xem lời chúc và kỷ niệm sinh nhật.
          </p>
        </div>

        <div className="grid gap-6">
          {/* Code Input Card */}
          <Link to="/code-input">
            <div className="card card-hover text-center cursor-pointer animate-slide-up group">
              <div className="text-4xl mb-4 group-hover:animate-bounce">💌</div>
              <h2 className="text-xl font-bold text-pastel-purple mb-3">
                Nhập mã lời chúc
              </h2>
              <p className="text-gray-600 mb-4 px-3 lg:px-0">
                Nhập các mã em cào trúng và nhận thông điệp từ anh nhé!
              </p>
              <div className="bg-pastel-pink/20 p-3 rounded-lg">
                <p className="text-sm text-gray-700">
                  🎯 Mỗi mã là một lời yêu thương
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Info Card */}
        <div className="card mt-8 bg-gradient-to-r from-pastel-pink to-pastel-purple text-white text-center animate-fade-in">
          <h3 className="text-xl font-bold mb-2">
            💡 Lưu ý
          </h3>
          <p>
            Em chỉ được dùng mục này khi thực sự cần thiết thôi nhé!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Menu;

