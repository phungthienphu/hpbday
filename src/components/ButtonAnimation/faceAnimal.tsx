const FaceAnimal = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <button
        onClick={onClick}
        className="pointer-events-auto w-24 h-24 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center text-5xl animate-pulse hover:animate-none"
      >
        🎂
      </button>
    </div>
  );
};

export default FaceAnimal;
