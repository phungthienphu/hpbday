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
  const eyeSize = size === 'big' ? 'w-14 h-14' : 'w-14 h-14';
  const pupilSize = size === 'big' ? 'w-6 h-6' : 'w-6 h-6';
  // const reflectionSize = size === 'big' ? 'w-3 h-3' : 'w-2.5 h-2.5';
  // const reflectionPos = size === 'big' ? 'top-2 left-2' : 'top-1.5 left-1.5';

  return (
    <div
      className={`absolute ${eyeSize} bg-white border border-black rounded-full shadow-lg`}
      style={position}
    >
      {/* Pupil */}
      <div
        className={`absolute ${pupilSize} bg-black rounded-full will-change-transform`}
        style={{
          top: '50%',
          left: '50%',
          transform: `translate(calc(-50% + ${pupilOffset.x}px), calc(-50% + ${pupilOffset.y}px))`,
          transition: 'transform 0.05s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {/* Light reflection */}
        {/* <div
          className={`absolute ${reflectionSize} bg-white rounded-full ${reflectionPos} opacity-90`}
        ></div> */}
      </div>
    </div>
  );
};

export default Eye;
