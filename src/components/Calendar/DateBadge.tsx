import dayjs from 'dayjs';

interface DateBadgeProps {
  date: dayjs.Dayjs;
}

const DateBadge = ({ date }: DateBadgeProps) => {
  return (
    <div className="relative flex-shrink-0">
      <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl shadow-lg flex flex-col items-center justify-center relative">
        {/* Calendar pins */}
        <div className="absolute -top-2 left-3 w-3 h-4 bg-orange-600 rounded-t-full"></div>
        <div className="absolute -top-2 right-3 w-3 h-4 bg-orange-600 rounded-t-full"></div>
        {/* Date number */}
        <span className="text-4xl font-bold text-white">
          {date.format('DD')}
        </span>
      </div>
    </div>
  );
};

export default DateBadge;

