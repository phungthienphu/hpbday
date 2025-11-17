const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-pastel-pink rounded-full animate-spin border-t-transparent"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl">
          💕
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;

