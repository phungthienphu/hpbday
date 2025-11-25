import { useEffect, type ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiCheckCircle, FiAlertTriangle, FiX } from "react-icons/fi";
import type { RootState } from "../../store/store";
import { clearError, clearSuccess } from "../../features/uiSlice";

const AUTO_HIDE_MS = 4000;

const Notification = () => {
  const dispatch = useDispatch();
  const { showError, errorMessage, showSuccess, successMessage } = useSelector(
    (state: RootState) => state.ui
  );

  useEffect(() => {
    if (!showSuccess) return undefined;
    const timer = window.setTimeout(() => dispatch(clearSuccess()), AUTO_HIDE_MS);
    return () => window.clearTimeout(timer);
  }, [dispatch, showSuccess, successMessage]);

  useEffect(() => {
    if (!showError) return undefined;
    const timer = window.setTimeout(() => dispatch(clearError()), AUTO_HIDE_MS);
    return () => window.clearTimeout(timer);
  }, [dispatch, showError, errorMessage]);

  const notifications = [
    showSuccess && {
      id: "success",
      title: "Thành công",
      message: successMessage,
      accent: "from-pastel-green to-emerald-500",
      icon: <FiCheckCircle className="h-6 w-6 text-emerald-600" />,
      onClose: () => dispatch(clearSuccess()),
    },
    showError && {
      id: "error",
      title: "Có lỗi rồi",
      message: errorMessage,
      accent: "from-rose-400 to-red-500",
      icon: <FiAlertTriangle className="h-6 w-6 text-red-600" />,
      onClose: () => dispatch(clearError()),
    },
  ].filter(Boolean) as Array<{
    id: string;
    title: string;
    message: string;
    accent: string;
    icon: ReactNode;
    onClose: () => void;
  }>;

  if (!notifications.length) return null;

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 max-w-sm w-full">
      {notifications.map(({ id, title, message, accent, icon, onClose }) => (
        <div
          key={id}
          role={id === "error" ? "alert" : "status"}
          className="relative overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100 animate-slide-up"
        >
          <div className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${accent}`} />
          <div className="flex items-start gap-3 p-4 pl-5">
            <div className="mt-1">{icon}</div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">{title}</p>
              {message && (
                <p className="text-sm text-gray-600 leading-5">{message}</p>
              )}
            </div>
            <button
              type="button"
              aria-label="Đóng thông báo"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notification;