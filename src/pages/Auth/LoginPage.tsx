import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loginUser, registerUser, clearError } from "../../features/authSlice";

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const action = isRegister
      ? dispatch(registerUser({ username, password, name }))
      : dispatch(loginUser({ username, password }));
    const result = await action;
    if (result.meta.requestStatus === "fulfilled") {
      navigate(from, { replace: true });
    }
  };

  const toggleMode = () => {
    setIsRegister((prev) => !prev);
    dispatch(clearError());
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #fff5f7 0%, #fef1f3 25%, #fdf2f8 50%, #fef7fb 75%, #fff9fc 100%)' }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-6 sm:mb-8">
          {/* <Link to="/" className="inline-block">
            <div className="w-12 h-12 mx-auto bg-gradient-to-br from-primary-400 to-accent-400 rounded-2xl flex items-center justify-center shadow-glow mb-4 animate-float">
              <span className="text-xl">🎂</span>
            </div>
          </Link> */}
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

          <div className="mt-5 pt-4 border-t border-primary-100/60 text-center">
            <p className="text-sm text-surface-500">
              {isRegister ? "Đã có tài khoản?" : "Chưa có tài khoản?"}{" "}
              <button type="button" onClick={toggleMode} className="text-primary-500 font-semibold hover:text-primary-600">
                {isRegister ? "Đăng nhập" : "Đăng ký"}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
