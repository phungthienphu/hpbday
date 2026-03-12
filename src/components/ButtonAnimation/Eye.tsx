interface EyeProps {
  size: 'big' | 'small';
  position: {
    left?: string;
    right?: string;
    top: string;
  };
  pupilOffset: {
    x: number;
    y: number;
  };
}

const Eye = ({ size, position, pupilOffset }: EyeProps) => {
  const eyeSize = size === 'big' ? 'w-14 h-14' : 'w-12 h-12';
  const pupilSize = size === 'big' ? 'w-6 h-6' : 'w-5 h-5';

  return (
    <div
      className={`absolute ${eyeSize} bg-white border border-black rounded-full shadow-lg`}
      style={position}
    >
      <div
        className={`absolute ${pupilSize} bg-black rounded-full will-change-transform`}
        style={{
          top: '50%',
          left: '50%',
          transform: `translate(calc(-50% + ${pupilOffset.x}px), calc(-50% + ${pupilOffset.y}px))`,
          transition: 'transform 0.05s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      />
    </div>
  );
};

export default Eye;
