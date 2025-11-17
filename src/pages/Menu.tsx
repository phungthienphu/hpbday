import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Link } from 'react-router-dom';

const Menu = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
        <div className="max-w-4xl w-full">
          <div className="card animate-fade-in bg-gradient-to-r from-pastel-pink/80 via-pastel-peach/80 to-pastel-blue/80 shadow-2xl md:flex md:items-center md:justify-between">
            <div className="md:w-2/3 pr-0 md:pr-8">
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

              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
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

            <div className="mt-6 md:mt-0 md:w-1/3 flex md:flex-col items-center justify-center gap-4">
              <div className="text-6xl">🔒</div>
              <Link to="/login" className="btn-primary">
                Đăng nhập để tiếp tục
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="card text-center mb-8 animate-fade-in bg-gradient-to-r from-pastel-pink/80 via-pastel-peach/80 to-pastel-blue/80">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pastel-pink to-pastel-purple mb-4">
            ✨ Birthday sections ✨
          </h1>
          <p className="text-lg text-gray-700">
            Chọn một trong những mục bên dưới để xem lời chúc và kỷ niệm sinh nhật.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Code Input Card */}
          <Link to="/code-input">
            <div className="card card-hover text-center cursor-pointer animate-slide-up group">
              <div className="text-7xl mb-4 group-hover:animate-bounce">💌</div>
              <h2 className="text-2xl font-bold text-pastel-purple mb-3">
                Nhập mã lời chúc
              </h2>
              <p className="text-gray-600 mb-4">
                Nhập các mã đã chuẩn bị trước để mở ra những lời chúc sinh nhật được
                thiết kế riêng.
              </p>
              <div className="bg-pastel-pink/20 p-3 rounded-lg">
                <p className="text-sm text-gray-700">
                  🎯 Mỗi mã là một lời yêu thương
                </p>
              </div>
            </div>
          </Link>

          {/* Memories Card */}
          <Link to="/memories">
            <div className="card card-hover text-center cursor-pointer animate-slide-up group" style={{ animationDelay: '0.1s' }}>
              <div className="text-7xl mb-4 group-hover:animate-bounce">📸</div>
              <h2 className="text-2xl font-bold text-pastel-purple mb-3">
                Kỷ niệm sinh nhật
              </h2>
              <p className="text-gray-600 mb-4">
                Những khoảnh khắc đáng nhớ quanh ngày sinh nhật: tiệc tùng, bạn bè,
                gia đình,...
              </p>
              <div className="bg-pastel-purple/20 p-3 rounded-lg">
                <p className="text-sm text-gray-700">
                  💖 Từng hình ảnh, từng kỷ niệm
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Info Card */}
        <div className="card mt-8 bg-gradient-to-r from-pastel-pink to-pastel-purple text-white text-center animate-fade-in">
          <h3 className="text-xl font-bold mb-2">
            💡 Mẹo nhỏ
          </h3>
          <p>
            Bạn có thể đưa link trang này cho bạn bè, mỗi người một mã lời chúc
            khác nhau để người được chúc mở dần trong suốt ngày sinh nhật.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Menu;

