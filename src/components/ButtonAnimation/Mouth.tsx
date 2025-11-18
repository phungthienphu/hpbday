interface MouthProps {
  isOpen: boolean;
  openLevel?: number; // 0-1, 0 = đóng, 1 = mở max
}

const Mouth = ({ isOpen, openLevel = 0 }: MouthProps) => {
  // Tính toán độ mở của miệng
  // const mouthHeight = isOpen 
  //   ? 'h-5' 
  //   : openLevel > 0 
  //   ? `h-${Math.max(1, Math.floor(openLevel * 10))}` 
  //   : 'h-1';
  
  const mouthWidth = isOpen
    ? 90
    : openLevel > 0
    ? 50 + (openLevel * 40) // 50px -> 90px
    : 50;

  const bottomPosition = isOpen
    ? 15
    : openLevel > 0
    ? 25 - (openLevel * 10) // 25px -> 15px
    : 25;

  const teethCount = Math.max(3, Math.floor(7 * openLevel));
  const showTeeth = isOpen || openLevel > 0.3;

  return (
    <div
      className="absolute left-1/2 transform -translate-x-1/2 transition-all duration-300"
      style={{
        bottom: `${bottomPosition}px`,
        width: `${mouthWidth}px`,
      }}
    >
      {/* Mouth opening - Dark background */}
      <div
        className="relative bg-gray-900 rounded-full transition-all duration-300 overflow-hidden"
        style={{
          height: isOpen ? '20px' : `${Math.max(4, openLevel * 20)}px`,
        }}
      >
        {/* Teeth - visible when mouth opens */}
        {showTeeth && (
          <div className="absolute top-0 left-0 right-0 flex justify-around items-start pt-0.5 animate-fade-in">
            {[...Array(Math.max(3, teethCount))].map((_, i) => (
              <div
                key={i}
                className="w-2 h-3 bg-white rounded-b-lg transition-all duration-200"
                style={{
                  animationDelay: `${i * 0.03}s`,
                  transform: `scaleY(${openLevel})`,
                }}
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Mouth;
