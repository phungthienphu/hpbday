interface CalendarDayProps {
  day: number;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
  isSunday: boolean;
  onClick: () => void;
}

const CalendarDay = ({
  day,
  isCurrentMonth,
  isSelected,
  isToday,
  isSunday,
  onClick,
}: CalendarDayProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
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
      {isCurrentMonth ? day : ''}
      {isSelected && (
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-orange-400 rounded-full"></div>
      )}
    </button>
  );
};

export default CalendarDay;

