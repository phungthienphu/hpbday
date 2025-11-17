interface MouthProps {
  isOpen: boolean;
}

const Mouth = ({ isOpen }: MouthProps) => {
  return (
    <div
      className="absolute left-1/2 transform -translate-x-1/2 transition-all duration-300"
      style={{
        bottom: isOpen ? '15px' : '25px',
        width: isOpen ? '90px' : '50px',
      }}
    >
      {/* Mouth opening - Dark background */}
      <div
        className={`relative bg-gray-900 rounded-full transition-all duration-300 overflow-hidden ${
          isOpen ? 'h-5' : 'h-1'
        }`}
      >
        {/* Teeth - only visible when mouth opens */}
        {isOpen && (
          <div className="absolute top-0 left-0 right-0 flex justify-around items-start pt-0.5 animate-fade-in">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-3 bg-white rounded-b-lg"
                style={{
                  animationDelay: `${i * 0.05}s`,
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

