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
  const { unlockedMessage } = useSelector((state: RootState) => state.memory);

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
    } catch {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="container mx-auto lg:px-6 md:px-6 px-1 lg:py-12 md:py-12 py-6 relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="card text-center lg:mb-8 md:mb-8 mb-4 animate-fade-in">
          <h1 className="lg:text-4xl lg:font-bold md:text-4xl md:font-bold text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pastel-pink to-pastel-purple mb-4">
            💌 Nhập mã bí mật 💌
          </h1>
          <p className="text-lg text-gray-700">
            Nhập mã đặc biệt để nhận thông điệp yêu thương từ anh nhé! 
          </p>
        </div>

        <div className="grid gap-8">
          <div className={`card ${shake ? 'animate-shake' : ''}`}>
            <div className="flex items-center gap-4 mb-5 p-2">
              <img
                src="/him-face.png"
                alt="him_face_sticker"
                className="w-20 h-[80px] md:w-40 md:h-[150px] lg:w-40 lg:h-[150px] hover:scale-110 cursor-pointer transition-all duration-300 bg-transparent"
              />
              <div className="text-left border-b border-gray-300 lg:pb-4 md:pb-4 pb-2 w-full">
                <h2 className="text-lg md:text-xl lg:text-xl font-semibold">Tôi bảo này nhé!</h2>
                <p className="text-xs md:text-sm lg:text-sm text-gray-700">
                  {error ? 'Ơ mã này nghe lạ lắm, thử lại xem?' : 'Nhập mã đặc biệt để nhận thông tin nha.'}
                </p>
                <p
                  className={`mt-2 text-xs md:text-sm lg:text-sm tracking-[0.2em]  ${
                    error ? 'text-rose-500' : 'text-gray-400'
                  }`}
                >
                  {error ? '❌ invalid code' : '💡 Chữ in hoa, không khoảng trắng'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold mb-2 tracking-[0.3em] uppercase text-xs text-gray-500">
                  Enter Code
                </label>
                <div className="flex w-full lg:flex-row md:flex-row flex-col gap-1 lg:gap-0 md:gap-0 border border-gray-300 bg-white shadow-sm">
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    className="flex-1 px-5 py-3 text-base tracking-[0.35em] uppercase text-gray-600 focus:outline-none"
                    placeholder="ENTER CODE"
                    required
                  />
                  <button
                    type="submit"
                    className="px-8 md:px-10 py-3 bg-[#FFB6C1] text-white text-sm tracking-[0.35em] uppercase font-semibold border-l border-gray-300  transition"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Result Modal */}
      {/* <ModalCustom
        title="Thông điệp cho em"
        description={unlockedMessage?.message||''}
        textLeft="Đã hiểu rồi"
        textRight="Đóng"
        show={unlockedMessage!=null}
        onClose={() => dispatch(clearUnlockedMessage())}
        onSubmit={() => dispatch(clearUnlockedMessage())}
      /> */}
      {unlockedMessage && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative animate-scale-in">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
              onClick={() => {
                dispatch(clearUnlockedMessage());
              }}
            >
              ✕
            </button>
            <div className="text-center space-y-4">
              <div className="text-6xl animate-bounce">{unlockedMessage.emoji}</div>
              <h3 className="lg:text-2xl md:text-xl text-lg">Thông điệp cho em</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                {unlockedMessage.message}
              </p>
              <span className="text-sm text-gray-700 leading-relaxed">
                {unlockedMessage?.messagesub||''}
              </span>
              <button
                className="mt-4 w-full bg-gray-900 text-white py-3 rounded-xl font-semibold tracking-[0.2em]"
                onClick={() => {
                  dispatch(clearUnlockedMessage());
                }}
              >
                Đã hiểu rồi 💗
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeInput;


