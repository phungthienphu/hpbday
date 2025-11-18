interface EyebrowProps {
  position: {
    left?: string;
    right?: string;
    top: string;
  };
  isExcited?: boolean;
}

const Eyebrow = ({ position, isExcited = false }: EyebrowProps) => {
  return (
    <div
      className="absolute w-12 h-1.5 bg-gray-800/80 rounded-full transition-all duration-300"
      style={{
        ...position,
        transform: isExcited 
          ? 'rotate(-10deg)' // Nâng lên khi excited
          : 'rotate(5deg)',  // Cau xuống khi bình thường (lườm)
      }}
    />
  );
};

export default Eyebrow;

