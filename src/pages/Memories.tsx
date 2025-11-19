import { useMemo, useState, useRef, Fragment } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Navigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

type ImageModule = { default: string };
type HeroEntry = { url: string; albumId: string; title: string };

const HERO_SEED = Math.random();

const Memories = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { memories } = useSelector((state: RootState) => state.memory);
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [initialSlide, setInitialSlide] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);

  const imageModules = useMemo(
    () =>
      import.meta.glob("../assets/img/**/*.{jpg,jpeg,png}", {
        eager: true,
      }) as Record<string, ImageModule>,
    []
  );

  const albumImages = useMemo(() => {
    const map: Record<string, string[]> = {};
    memories.forEach((album) => {
      const images = Object.entries(imageModules)
        .filter(([path]) => path.includes(`/assets/img/${album.folder}/`))
        .map(([, mod]) => mod.default)
        .sort();
      map[album.id] = images;
    });
    return map;
  }, [imageModules, memories]);

  const heroPool = useMemo<HeroEntry[]>(() => {
    return memories.flatMap((album) =>
      (albumImages[album.id] || []).map((url) => ({
        url,
        albumId: album.id,
        title: album.title,
      }))
    );
  }, [albumImages, memories]);

  const heroImage = useMemo<HeroEntry | null>(() => {
    if (!heroPool.length) return null;
    const idx = Math.floor(HERO_SEED * heroPool.length) % heroPool.length;
    return heroPool[idx];
  }, [heroPool]);

  const openAlbum = (albumId: string, startIndex = 0) => {
    setSelectedAlbum(albumId);
    setInitialSlide(startIndex);
  };

  const closeAlbum = () => {
    setSelectedAlbum(null);
    setInitialSlide(0);
  };

  const modalImages = selectedAlbum ? albumImages[selectedAlbum] || [] : [];

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container mx-auto  lg:px-4 md:px-4 px:1 lg:py-12 md:py-12 py-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Hero */}
        {heroImage && (
          <div className="card animate-fade-in flex flex-col md:flex-row items-center gap-6 cursor-pointer" onClick={() => openAlbum(heroImage.albumId)}>
            <div className="relative w-full md:w-1/2 h-56 md:h-72 overflow-hidden rounded-2xl">
              <img src={heroImage.url} alt={heroImage.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="text-center md:text-left space-y-3 md:w-1/2">
              <p className="text-xs tracking-[0.3em] uppercase text-gray-500">
                Featured memory
              </p>
              <h2 className="text-2xl font-semibold text-gray-900">
                {heroImage.title}
              </h2>
              <p className="text-sm text-gray-600">
                Nhấn để mở slideshow kỷ niệm này nhé 💞
              </p>
            </div>
          </div>
        )}

        {/* Memories Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {memories.map((memory) => {
            const cover = albumImages[memory.id]?.[0];
            return (
              <div
                key={memory.id}
                className="card card-hover cursor-pointer animate-slide-up flex flex-col h-full"
                onClick={() => openAlbum(memory.id)}
              >
                <div className="relative overflow-hidden rounded-xl mb-4 h-56 sm:h-64">
                  {cover ? (
                    <img
                      src={cover}
                      alt={memory.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                      No image
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <p className="text-white p-4 font-semibold">
                      Nhấp để xem chi tiết 💕
                    </p>
                  </div>
                </div>

                <div className="inline-block bg-gradient-to-r from-pastel-pink to-pastel-purple text-white px-4 py-1 rounded-full text-sm font-semibold mb-3">
                  📅 {memory.date}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {memory.title}
                </h3>
                <p className="text-gray-700 leading-relaxed flex-1">
                  {memory.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer Message */}
        <div className="card bg-gradient-to-r from-pastel-pink via-pastel-purple to-pastel-blue text-white text-center animate-fade-in">
          <div className="text-6xl mb-4">💑</div>
          <h3 className="text-2xl font-bold mb-3">
            Còn nhiều kỷ niệm đẹp đang chờ đôi ta tạo nên!
          </h3>
          <p className="text-lg">
            Anh hứa sẽ luôn ở bên em, tạo ra thật nhiều khoảnh khắc tuyệt vời. Yêu em nhiều lắm! 💕💕💕
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="card text-center card-hover">
            <div className="text-5xl mb-3">📷</div>
            <p className="text-3xl font-bold text-pastel-purple mb-1">
              {memories.length}
            </p>
            <p className="text-gray-600">Bộ sưu tập</p>
          </div>

          <div className="card text-center card-hover">
            <div className="text-5xl mb-3">💕</div>
            <p className="text-3xl font-bold text-pastel-pink mb-1">
              ∞
            </p>
            <p className="text-gray-600">Tình yêu</p>
          </div>

          <div className="card text-center card-hover">
            <div className="text-5xl mb-3">🌟</div>
            <p className="text-3xl font-bold text-pastel-blue mb-1">
              Forever
            </p>
            <p className="text-gray-600">Mãi mãi</p>
          </div>
        </div>
      </div>

      <Transition appear show={Boolean(selectedAlbum)} as={Fragment}>
        <Dialog as="div" className="relative z-[120]" onClose={closeAlbum}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center px-4 py-8">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl py-2 rounded-xl bg-white sm:p-6 shadow-2xl space-y-4">
                  <Dialog.Title className="text-center text-xl font-semibold text-gray-900">
                    {memories.find((m) => m.id === selectedAlbum)?.title}
                  </Dialog.Title>

                  {modalImages.length > 0 ? (
                    <Swiper
                      modules={[Navigation, Autoplay]}
                      navigation
                      autoplay={{ delay: 2000, disableOnInteraction: false }}
                      loop
                      initialSlide={initialSlide}
                      onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                        swiper.slideToLoop(initialSlide, 0);
                      }}
                      className="rounded-0 overflow-hidden"
                    >
                      {modalImages.map((src, idx) => (
                        <SwiperSlide key={`${selectedAlbum}-${idx}`}>
                          <div className="mx-auto w-full max-w-[420px] aspect-square bg-gray-100  overflow-hidden flex items-center justify-center ">
                            <img
                              src={src}
                              alt=""
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <p className="text-center text-gray-500 py-10">
                      Chưa có ảnh nào trong album này.
                    </p>
                  )}

                  <button
                    onClick={closeAlbum}
                    className="w-full py-2 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
                  >
                    Đóng lại
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Memories;

