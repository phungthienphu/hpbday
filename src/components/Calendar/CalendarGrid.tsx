import dayjs from 'dayjs';
import CalendarDay from './CalendarDay';

interface CalendarGridProps {
  viewDate: dayjs.Dayjs;
  selectedDate: dayjs.Dayjs | null;
  onDateSelect: (day: number) => void;
}

const CalendarGrid = ({ viewDate, selectedDate, onDateSelect }: CalendarGridProps) => {
  const startOfMonth = viewDate.startOf('month');
  const daysInMonth = viewDate.daysInMonth();
  const firstDayOfWeek = startOfMonth.day();
  
  const totalSlots = Math.ceil((firstDayOfWeek + daysInMonth) / 7) * 7;
  const days = [];

  for (let i = 0; i < totalSlots; i++) {
    const dayNumber = i - firstDayOfWeek + 1;
    const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
    const currentDate = viewDate.date(dayNumber);
    
    const isSelected = selectedDate?.isSame(currentDate, 'day') || false;
    const isToday = dayjs().isSame(currentDate, 'day');
    const isSunday = i % 7 === 0;

    days.push(
      <CalendarDay
        key={i}
        day={dayNumber}
        isCurrentMonth={isCurrentMonth}
        isSelected={isSelected}
        isToday={isToday}
        isSunday={isSunday}
        onClick={() => isCurrentMonth && onDateSelect(dayNumber)}
      />
    );
  }

  return (
    <div>
      {/* Week days header */}
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

      {/* Calendar days grid */}
      <div className="grid grid-cols-7 gap-3">{days}</div>
    </div>
  );
};

export default CalendarGrid;

