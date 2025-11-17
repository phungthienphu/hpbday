import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { login } from '../features/authSlice';
import type { RootState } from '../store/store';
import FaceAnimal from './ButtonAnimation/faceAnimal';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [viewDate, setViewDate] = useState(dayjs());
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!isOpen) return null;

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
        }),
      );
      onClose();
      setShowCalendar(false);
      navigate('/menu');
    } catch {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setError(false), 3000);
    }
  };

  const handleClose = () => {
    setShowCalendar(false);
    onClose();
  };

  const renderCalendar = () => {
    const startOfMonth = viewDate.startOf('month');
    const daysInMonth = viewDate.daysInMonth();
    const firstDayOfWeek = startOfMonth.day();
    
    const days = [];
    const totalSlots = Math.ceil((firstDayOfWeek + daysInMonth) / 7) * 7;

    for (let i = 0; i < totalSlots; i++) {
      const dayNumber = i - firstDayOfWeek + 1;
      const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
      const currentDate = viewDate.date(dayNumber);
      
      const isSelected = selectedDate?.isSame(currentDate, 'day') || false;
      const isToday = dayjs().isSame(currentDate, 'day');
      const isSunday = i % 7 === 0;

      days.push(
        <button
          key={i}
          type="button"
          onClick={() => isCurrentMonth && handleDateSelect(dayNumber)}
          disabled={!isCurrentMonth}
          className={`
            aspect-square flex flex-col items-center justify-center text-base font-semibold rounded-lg
            transition-all duration-200 relative
            ${!isCurrentMonth ? 'text-gray-300 cursor-not-allowed' : ''}
            ${isCurrentMonth && !isSelected && !isSunday ? 'text-gray-800 hover:bg-orange-100' : ''}
            ${isCurrentMonth && isSunday && !isSelected ? 'text-orange-500 hover:bg-orange-100' : ''}
            ${isSelected ? 'text-orange-500 font-bold' : ''}
            ${isToday && !isSelected ? 'bg-orange-50' : ''}
          `}
        >
          {isCurrentMonth ? dayNumber : ''}
          {isSelected && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-orange-400 rounded-full"></div>
          )}
        </button>
      );
    }

    return days;
  };

  return (
    <>
      {/* Floating Button - Only show when not authenticated */}
      {!isAuthenticated && !showCalendar && (
        <FaceAnimal onClick={() => setShowCalendar(true)} />
      )}

      {/* Calendar Modal - Only show when not authenticated */}
      {!isAuthenticated && showCalendar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div
            className={`bg-gradient-to-br from-white to-orange-50/30 rounded-3xl shadow-2xl w-[520px] p-10 animate-scale-in ${
              shake ? 'animate-shake' : ''
            }`}
          >
            {/* Header with Calendar Icon and Close */}
            <div className="flex justify-between items-start mb-8">
              <div className="flex-1">
                <h2 className="text-4xl font-bold text-gray-900 mb-1">
                  Select Date
                </h2>
              </div>
              
              <div className="flex items-start gap-4">
                {/* Calendar Badge Icon */}
                {selectedDate && (
                  <div className="relative flex-shrink-0">
                    <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl shadow-lg flex flex-col items-center justify-center relative">
                      {/* Calendar pins */}
                      <div className="absolute -top-2 left-3 w-3 h-4 bg-orange-600 rounded-t-full"></div>
                      <div className="absolute -top-2 right-3 w-3 h-4 bg-orange-600 rounded-t-full"></div>
                      {/* Date number */}
                      <span className="text-4xl font-bold text-white">
                        {selectedDate.format('DD')}
                      </span>
                    </div>
                  </div>
                )}
                
                {/* Close button */}
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-300 rounded-xl animate-fade-in">
                <p className="text-sm text-red-700 text-center font-medium">
                  ❌ Ngày kỷ niệm chưa đúng, thử lại nhé.
                </p>
              </div>
            )}

            {/* Month/Year Selector */}
            <div className="flex items-center gap-3 mb-8">
              <select
                value={viewDate.month()}
                onChange={(e) => setViewDate(viewDate.month(Number(e.target.value)))}
                className="flex-1 px-5 py-3 bg-gray-100 rounded-xl text-base font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 appearance-none cursor-pointer"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i}>
                    {dayjs().month(i).format('MMMM')}
                  </option>
                ))}
              </select>

              <select
                value={viewDate.year()}
                onChange={(e) => setViewDate(viewDate.year(Number(e.target.value)))}
                className="flex-1 px-5 py-3 bg-gray-100 rounded-xl text-base font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 appearance-none cursor-pointer"
              >
                {[2023, 2024, 2025, 2026, 2027].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Calendar Grid */}
            <div className="mb-8">
              {/* Week days */}
              <div className="grid grid-cols-7 gap-3 mb-4">
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
                  <div
                    key={day}
                    className={`text-center text-sm font-bold ${
                      day === 'SUN' ? 'text-orange-500' : 'text-gray-800'
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-3">{renderCalendar()}</div>
            </div>

            {/* Confirm Button */}
            <button
              type="button"
              onClick={handleConfirm}
              disabled={!selectedDate}
              className={`w-full py-4 rounded-2xl text-base font-semibold transition-all duration-300 ${
                selectedDate
                  ? 'bg-gradient-to-r from-orange-400 to-amber-500 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
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
