import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';

const Memories = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { memories } = useSelector((state: RootState) => state.memory);
  const [selectedMemory, setSelectedMemory] = useState<number | null>(null);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="card text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pastel-pink to-pastel-purple mb-4">
            📸 Kỷ niệm của đôi ta 📸
          </h1>
          <p className="text-lg text-gray-700">
            Những khoảnh khắc đẹp nhất chúng mình đã cùng nhau tạo nên 💕
          </p>
        </div>

        {/* Memories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memories.map((memory, index) => (
            <div
              key={memory.id}
              className="card card-hover cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedMemory(selectedMemory === memory.id ? null : memory.id)}
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-xl mb-4 group">
                <img
                  src={memory.image}
                  alt={memory.description}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white p-4 font-semibold">
                    Nhấp để xem chi tiết 💕
                  </p>
                </div>
              </div>

              {/* Date Badge */}
              <div className="inline-block bg-gradient-to-r from-pastel-pink to-pastel-purple text-white px-4 py-1 rounded-full text-sm font-semibold mb-3">
                📅 {memory.date}
              </div>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed">
                {memory.description}
              </p>

              {/* Expanded View */}
              {selectedMemory === memory.id && (
                <div className="mt-4 p-4 bg-gradient-to-r from-pastel-pink/20 to-pastel-purple/20 rounded-xl animate-fade-in border-2 border-pastel-purple/30">
                  <p className="text-center text-pastel-purple font-semibold mb-2">
                    ✨ Kỷ niệm đặc biệt ✨
                  </p>
                  <p className="text-sm text-gray-600 text-center">
                    Đây là một trong những khoảnh khắc đẹp nhất mà anh muốn lưu giữ mãi mãi. 
                    Em đã mang lại cho anh biết bao niềm vui! 💖
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Message */}
        <div className="card mt-8 bg-gradient-to-r from-pastel-pink via-pastel-purple to-pastel-blue text-white text-center animate-fade-in">
          <div className="text-6xl mb-4">💑</div>
          <h3 className="text-2xl font-bold mb-3">
            Còn nhiều kỷ niệm đẹp đang chờ đôi ta tạo nên!
          </h3>
          <p className="text-lg">
            Anh hứa sẽ luôn ở bên em, tạo ra thật nhiều khoảnh khắc tuyệt vời. 
            Yêu em nhiều lắm! 💕💕💕
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="card text-center card-hover">
            <div className="text-5xl mb-3">📷</div>
            <p className="text-3xl font-bold text-pastel-purple mb-1">
              {memories.length}
            </p>
            <p className="text-gray-600">Kỷ niệm</p>
          </div>

          <div className="card text-center card-hover">
            <div className="text-5xl mb-3">💕</div>
            <p className="text-3xl font-bold text-pastel-pink mb-1">
              ∞
            </p>
            <p className="text-gray-600">Tình yêu</p>
          </div>

          <div className="card text-center card-hover">
            <div className="text-5xl mb-3">🌟</div>
            <p className="text-3xl font-bold text-pastel-blue mb-1">
              Forever
            </p>
            <p className="text-gray-600">Mãi mãi</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Memories;

