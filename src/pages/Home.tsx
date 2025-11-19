const Home = () => {
  return (
    <div className="animate-fade-in flex flex-col gap-10 md:flex-row md:items-stretch md:gap-10">
      {/* Left: intro text */}
      <div className="md:w-1/2 flex flex-col justify-between border-b md:border-b-0 md:border-r border-black/10 pb-8 md:pb-0 md:pr-8 text-center md:text-left">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-gray-700 mb-4">
            Birthday
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight mb-4">
            Happy Birthday
            <br />
            To My Baby!
          </h1>

          <div className="mt-4 text-sm text-gray-700 space-y-1">
            <p className="font-medium">
              Friday | Dec 05, 2025
            </p>
          </div>

          <p className="mt-6 text-gray-700 text-sm leading-relaxed max-w-md">
            Đây là một sản phẩm nhỏ anh làm tặng cho em nhân ngày sinh nhật em, nó cũm hong có gì cả, chỉ là anh muốn làm gì đó khác thường xíu, em nghịch nghịch có gì khum hiểu gõ anh nhaa!
          </p>
        </div>

        {/* <button className="mt-8 inline-flex items-center justify-center self-center md:self-start px-8 py-3 bg-gray-900 text-white text-sm tracking-[0.2em] uppercase rounded-full hover:bg-gray-800 transition-all duration-300 animate-slide-up">
          Join now!
        </button> */}
      </div>

      {/* Right: image */}
      <div className="md:w-1/2 animate-slide-up">
        <div className="relative max-h-[400px] sm:h-80 md:h-full w-full overflow-hidden rounded-xl shadow-xl">
          <img
            src="./image.png"
            alt="Birthday celebration"
            className="w-full h-full object-cover transform-origin-center transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;

