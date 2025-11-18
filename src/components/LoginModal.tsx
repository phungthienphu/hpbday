import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import confetti from "canvas-confetti";
import { login } from "../features/authSlice";
import type { RootState } from "../store/store";
import { Cake } from "./ButtonAnimation";
import { CalendarGrid, DateBadge } from "./Calendar";
import { useMonster } from "../contexts/MonsterContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCalendarOpen?: () => void;
  onCalendarClose?: () => void;
}

const LoginModal = ({
  isOpen,
  onClose,
  onCalendarOpen,
  onCalendarClose,
}: LoginModalProps) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [viewDate, setViewDate] = useState(dayjs());
  const [error, setError] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Use Monster Context
  const {
    monsterPosition,
    setDistanceToMonster,
    setIsMonsterEating,
    setIsDraggingFood,
  } = useMonster();

  // Cake position
  const [cakePosition, setCakePosition] = useState({ x: 0, y: 0 });

  // Notify context về dragging status
  useEffect(() => {
    // Birthday cake mode chỉ active khi chưa login và chưa mở calendar
    const isCakeVisible = !isAuthenticated && !showCalendar;
    if (!isCakeVisible) {
      setIsDraggingFood(false);
      setDistanceToMonster(1000);
    }
  }, [isAuthenticated, showCalendar, setIsDraggingFood, setDistanceToMonster]);

  if (!isOpen) return null;

  const handleCakePositionChange = (x: number, y: number) => {
    setCakePosition({ x, y });
    // Calculate distance to monster REALTIME
    const distance = Math.sqrt(
      Math.pow(x - monsterPosition.x, 2) + Math.pow(y - monsterPosition.y, 2)
    );
    setDistanceToMonster(distance);
  };

  const handleFeedMonster = () => {
    setIsMonsterEating(true);

    // Confetti
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { x: 0.5, y: 0.35 },
      colors: ["#FFA500", "#FFD700", "#FF6347"],
    });

    // Mở calendar sau 0.5s
    setTimeout(() => {
      setIsMonsterEating(false);
      setShowCalendar(true);
      onCalendarOpen?.();
    }, 500);
  };

  const handleDateSelect = (day: number) => {
    const date = viewDate.date(day);
    setSelectedDate(date);
  };

  const handleConfirm = () => {
    if (!selectedDate) return;

    try {
      dispatch(
        login({
          day: selectedDate.date(),
          month: selectedDate.month() + 1,
          year: selectedDate.year(),
        })
      );

      // Success confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FFA500", "#FFD700", "#FF6347"],
      });

      setTimeout(() => {
        onClose();
        setShowCalendar(false);
      }, 300);
    } catch {
      setError(true);
      setTimeout(() => setError(false), 3000);
    } finally {
      navigate("/menu");
    }
  };

  const handleCloseCalendar = () => {
    setShowCalendar(false);
    setSelectedDate(null);
    setError(false);
    onCalendarClose?.();
  };

  return (
    <>
      {/* Birthday Cake - chỉ hiện khi chưa login */}
      {!isAuthenticated && !showCalendar && (
        <Cake
          onPositionChange={handleCakePositionChange}
          onDragStart={() => setIsDraggingFood(true)}
          onDragEnd={() => {
            setIsDraggingFood(false);
            // Check distance khi thả
            const distance = Math.sqrt(
              Math.pow(cakePosition.x - monsterPosition.x, 2) +
                Math.pow(cakePosition.y - monsterPosition.y, 2)
            );
            if (distance < 80) {
              handleFeedMonster();
            }
          }}
          isBeingEaten={false}
        />
      )}

      {/* Calendar Modal */}
      {!isAuthenticated && showCalendar && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseCalendar();
          }}
        >
          <div className="bg-gradient-to-br from-white to-orange-50/30 rounded-3xl shadow-2xl w-[520px] p-10 animate-scale-in">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
              <div className="flex-1">
                <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-1">
                  ACCESS
                </p>
                <h2 className="text-4xl font-bold text-gray-900">
                  Select Date
                </h2>
              </div>

              <div className="flex items-start gap-4">
                {selectedDate && <DateBadge date={selectedDate} />}

                <button
                  type="button"
                  onClick={handleCloseCalendar}
                  className="text-gray-400 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-300 rounded-xl animate-fade-in">
                <p className="text-sm text-red-700 text-center font-medium">
                  ❌ Ngày kỷ niệm chưa đúng, thử lại nhé.
                </p>
              </div>
            )}

            {/* Month/Year Selector */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <select
                value={viewDate.month()}
                onChange={(e) =>
                  setViewDate(viewDate.month(Number(e.target.value)))
                }
                className="px-5 py-3 bg-gray-100 rounded-xl text-base font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer transition-all"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i}>
                    {dayjs().month(i).format("MMMM")}
                  </option>
                ))}
              </select>

              <select
                value={viewDate.year()}
                onChange={(e) =>
                  setViewDate(viewDate.year(Number(e.target.value)))
                }
                className="px-5 py-3 bg-gray-100 rounded-xl text-base font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer transition-all"
              >
                {[2023, 2024, 2025, 2026, 2027].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Calendar */}
            <div className="mb-8">
              <CalendarGrid
                viewDate={viewDate}
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
              />
            </div>

            {/* Confirm Button */}
            <button
              type="button"
              onClick={handleConfirm}
              disabled={!selectedDate}
              className={`w-full py-4 rounded-2xl text-base font-semibold transition-all duration-300 ${
                selectedDate
                  ? "bg-gradient-to-r from-orange-400 to-amber-500 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
