import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { unlockMessage, clearUnlockedMessage } from '../features/memorySlice';
import { Navigate } from 'react-router-dom';

const CodeInput = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { unlockedMessage, codeMessages } = useSelector((state: RootState) => state.memory);

  useEffect(() => {
    return () => {
      dispatch(clearUnlockedMessage());
    };
  }, [dispatch]);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      dispatch(unlockMessage(code));
      setCode('');
      setError(false);
    } catch (err) {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="card text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pastel-pink to-pastel-purple mb-4">
            💌 Nhập mã bí mật 💌
          </h1>
          <p className="text-lg text-gray-700">
            Nhập mã đặc biệt để nhận thông điệp yêu thương từ anh nhé! 💝
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div>
            <div className={`card ${shake ? 'animate-shake' : ''}`}>
              <h2 className="text-2xl font-bold text-pastel-purple mb-4">
                🔐 Nhập mã
              </h2>

              {error && (
                <div className="mb-4 p-4 bg-red-100 border-2 border-red-400 rounded-xl animate-fade-in">
                  <p className="text-red-700 text-center font-semibold">
                    ❌ Mã không đúng! Thử lại nhé!
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Mã bí mật
                  </label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    className="input-field text-center text-2xl font-bold tracking-wider"
                    placeholder="NHẬP MÃ..."
                    required
                  />
                </div>

                <button type="submit" className="w-full btn-primary">
                  Mở thông điệp 💕
                </button>
              </form>

              <div className="mt-6 p-4 bg-pastel-pink/10 rounded-xl">
                <p className="text-sm text-gray-600 text-center">
                  💡 Mã gồm các chữ cái viết hoa, không có khoảng trắng
                </p>
              </div>
            </div>

            {/* Unlocked Message Display */}
            {unlockedMessage && (
              <div className="card mt-6 bg-gradient-to-r from-pastel-pink to-pastel-purple text-white animate-fade-in">
                <div className="text-center">
                  <div className="text-6xl mb-4 animate-bounce">
                    {unlockedMessage.emoji}
                  </div>
                  <p className="text-2xl font-bold mb-3">
                    Thông điệp cho em:
                  </p>
                  <p className="text-xl leading-relaxed">
                    {unlockedMessage.message}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Available Codes Hints */}
          <div className="card animate-slide-up">
            <h2 className="text-2xl font-bold text-pastel-purple mb-4">
              🎯 Gợi ý mã
            </h2>
            <p className="text-gray-600 mb-4">
              Có tổng cộng <span className="font-bold text-pastel-purple">{codeMessages.length} mã</span> đang chờ em khám phá!
            </p>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {codeMessages.map((msg, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-pastel-pink/20 to-pastel-purple/20 p-4 rounded-xl border-2 border-pastel-purple/30 hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{msg.emoji}</span>
                      <div>
                        <p className="font-bold text-pastel-purple">
                          Mã #{index + 1}
                        </p>
                        <p className="text-sm text-gray-500">
                          {msg.code.length} ký tự
                        </p>
                      </div>
                    </div>
                    <div className="text-2xl">🔒</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-pastel-blue/20 rounded-xl">
              <p className="text-sm text-gray-600 text-center">
                ✨ Mỗi mã mở ra một thông điệp đặc biệt!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeInput;

