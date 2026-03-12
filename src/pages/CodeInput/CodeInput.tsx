import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  unlockMessage,
  clearUnlockedMessage,
} from "../../features/memorySlice";
import { motion } from "framer-motion";
import CodeMessage from "../../components/CodeMessage";

const CodeInput = () => {
  const [code, setCode] = useState("");
  const [shake, setShake] = useState(false);
  const dispatch = useAppDispatch();
  const { unlockedMessage } = useAppSelector((state) => state.memory);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    return () => {
      dispatch(clearUnlockedMessage());
    };
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      dispatch(unlockMessage(code));
      setCode("");
      setErrorMessage("");
    } catch (error) {
      if (error instanceof Error) {
        setShake(true);
        setErrorMessage(error.message);
        setTimeout(() => setShake(false), 500);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-5 sm:mb-6"
      >
        <h1 className="text-xl sm:text-2xl font-bold text-surface-800">Nhập mã bí mật</h1>
        <p className="text-sm text-surface-500 mt-0.5">
          Nhập mã đặc biệt để nhận thông điệp yêu thương từ anh nhé!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="card"
      >
        <div className="flex items-center gap-4 mb-5">
          <img
            src="/him-face.png"
            alt="him_face_sticker"
            className={`w-16 h-16 md:w-20 md:h-20 hover:scale-105 cursor-pointer transition-transform duration-200 ${
              shake ? "animate-shake" : ""
            }`}
          />
          <div className="flex-1">
            <h2 className="font-semibold text-surface-900">Tôi bảo này nhé!</h2>
            <p className={`text-sm mt-0.5 ${errorMessage ? "text-red-500" : "text-surface-500"}`}>
              {errorMessage || "Nhập mã đặc biệt để nhận thông tin nha."}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                setErrorMessage("");
              }}
              className="input-field flex-1 tracking-widest uppercase font-medium"
              placeholder="NHẬP MÃ"
              required
            />
            <button type="submit" className="btn-primary flex-shrink-0">
              Mở khóa
            </button>
          </div>
        </form>
      </motion.div>

      {unlockedMessage && (
        <CodeMessage
          onClose={() => dispatch(clearUnlockedMessage())}
          unlockedMessage={unlockedMessage}
        />
      )}
    </div>
  );
};

export default CodeInput;
