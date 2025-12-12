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
      className="absolute w-11 h-2 bg-[#f7d643] rounded-full transition-all duration-300"
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

