import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiCamera } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loginUser, registerUser, clearError, faceLoginUser } from "../../features/authSlice";
import { setSuccess } from "../../features/uiSlice";
import FaceCamera from "../../components/FaceCamera/FaceCamera";
import type { IUser } from "../../types/user";

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showFaceCamera, setShowFaceCamera] = useState(false);
  const [faceProcessing, setFaceProcessing] = useState(false);
  const [faceError, setFaceError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname || "/";

  const handleLoginSuccess = (user: IUser) => {
    dispatch(setSuccess(`Chào mừng ${user.name || user.username} quay trở lại! 🎉`));
    navigate(from, { replace: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const action = isRegister
      ? dispatch(registerUser({ username, password, name }))
      : dispatch(loginUser({ username, password }));
    const result = await action;
    if (result.meta.requestStatus === "fulfilled") {
      handleLoginSuccess(result.payload as IUser);
    }
  };

  const handleFaceCapture = async (descriptor: number[]) => {
    setFaceError(null);
    setFaceProcessing(true);
    try {
      const result = await dispatch(faceLoginUser(descriptor));
      if (result.meta.requestStatus === "fulfilled") {
        setShowFaceCamera(false);
        handleLoginSuccess(result.payload as IUser);
      } else {
        setFaceError((result.payload as string) || "Không nhận diện được khuôn mặt, thử lại!");
      }
    } finally {
      setFaceProcessing(false);
    }
  };

  const toggleMode = () => {
    setIsRegister((prev) => !prev);
    dispatch(clearError());
  };

  return (
    <>
      <div
        className="min-h-screen w-full flex items-center justify-center px-4"
        style={{ background: "linear-gradient(135deg, #fff5f7 0%, #fef1f3 25%, #fdf2f8 50%, #fef7fb 75%, #fff9fc 100%)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          {/* Logo */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-xl font-bold text-surface-800">
              {isRegister ? "Tạo tài khoản" : "Đăng nhập"}
            </h1>
            <p className="text-sm text-surface-500 mt-1">
              {isRegister ? "Đăng ký để trải nghiệm" : "Chào mừng quay trở lại"}
            </p>
          </div>

          <div className="card">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl"
              >
                <p className="text-sm text-red-600 text-center">{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              {isRegister && (
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-1.5">Tên</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                    placeholder="Tên của bạn"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-field"
                  placeholder="Tên đăng nhập"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder="Mật khẩu"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full justify-center disabled:opacity-50 mt-2"
              >
                {isLoading ? "Đang xử lý..." : isRegister ? "Đăng ký" : "Đăng nhập"}
              </button>
            </form>

            {/* Face login divider — chỉ hiện ở mode login */}
            {!isRegister && (
              <>
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-primary-100" />
                  <span className="text-xs text-surface-400">hoặc</span>
                  <div className="flex-1 h-px bg-primary-100" />
                </div>

                <button
                  type="button"
                  onClick={() => { dispatch(clearError()); setFaceError(null); setShowFaceCamera(true); }}
                  className="btn-secondary w-full justify-center gap-2 text-sm"
                >
                  <FiCamera size={15} />
                  Đăng nhập bằng khuôn mặt
                </button>
              </>
            )}

            <div className="mt-5 pt-4 border-t border-primary-100/60 text-center">
              <p className="text-sm text-surface-500">
                {isRegister ? "Đã có tài khoản?" : "Chưa có tài khoản?"}{" "}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-primary-500 font-semibold hover:text-primary-600"
                >
                  {isRegister ? "Đăng nhập" : "Đăng ký"}
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Face camera modal */}
      <AnimatePresence>
        {showFaceCamera && (
          <FaceCamera
            mode="login"
            onCapture={handleFaceCapture}
            onClose={() => { setShowFaceCamera(false); setFaceError(null); }}
            isProcessing={faceProcessing}
            error={faceError}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default LoginPage;
