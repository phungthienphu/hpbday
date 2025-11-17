const Home = () => {
  return (
    <div className="animate-fade-in md:flex md:items-stretch md:gap-10">
      {/* Left: intro text */}
      <div className="md:w-1/2 flex flex-col justify-between border-r border-black/10 pr-0 md:pr-8 mb-8 md:mb-0">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-gray-700 mb-4">
            Birthday
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight mb-4">
            Happy Birthday
            <br />
            To You!
          </h1>

          <div className="mt-4 text-sm text-gray-700 space-y-1">
            <p className="font-medium">
              Sun | May 18, 2025
            </p>
            <p>08 - 12 AM</p>
          </div>

          <p className="mt-6 text-gray-700 text-sm leading-relaxed max-w-md">
            Một banner sinh nhật đơn giản để gửi lời chúc, lời nhắn và những khoảnh
            khắc đáng nhớ cho người đặc biệt.
          </p>
        </div>

        <button className="mt-8 inline-flex items-center justify-center self-start px-8 py-3 bg-gray-900 text-white text-sm tracking-[0.2em] uppercase rounded-full hover:bg-gray-800 transition-all duration-300 animate-slide-up">
          Join now!
        </button>
      </div>

      {/* Right: image */}
      <div className="md:w-1/2 mt-4 md:mt-0 animate-slide-up">
        <div className="relative h-64 md:h-full w-full overflow-hidden rounded-xl shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=900&q=80"
            alt="Birthday celebration"
            className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;

