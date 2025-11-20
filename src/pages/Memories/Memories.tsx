import { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { Navigate } from "react-router-dom";
import cloudinary from "../../client/cloudinary";
import "swiper/css";
import "swiper/css/navigation";
import Sliderdetail from "./Sliderdetail";


const HERO_SEED = Math.random();
interface IImageItem{
  external_id: string;
  name: string;
  path: string;
  previewImage: string;
}
const Memories = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { memories } = useSelector((state: RootState) => state.memory);
  const [images, setImages] = useState<IImageItem[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<string>();
  const [openModal, setOpenModal] = useState(false);


  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await cloudinary.getFoldersWithPreview("CUA");
        const images = response;
        setImages(images);
      } catch (error) {
        console.error(error);
      }
    };
    fetchImages();
  }, []);

  const heroImage = useMemo<IImageItem | null>(() => {
    if (!images.length) return null;
    const idx = Math.floor(HERO_SEED * images.length) % images.length;
    return images[idx];
  }, [images]);

  const openAlbum = (albumId: string) => {
    setSelectedAlbum(albumId);
    setOpenModal(true);
  };
  const closeModal = () => {
    setSelectedAlbum("");
    setOpenModal(false);
  };
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container mx-auto  lg:px-4 md:px-4 px:1 lg:py-12 md:py-12 py-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Hero */}
        {heroImage && (
          <div
            className="card animate-fade-in flex flex-col md:flex-row items-center gap-6 cursor-pointer"
            onClick={() => openAlbum(heroImage.path)}
          >
            <div className="relative w-full md:w-1/2 h-56 md:h-72 overflow-hidden lg:rounded-xl md:rounded-xl rounded-md">
              <img
                src={heroImage.previewImage}
                alt={heroImage.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="text-center md:text-left space-y-3 md:w-1/2">
              <p className="text-xs tracking-[0.3em] uppercase text-gray-500">
                Featured memory
              </p>
              <h2 className="lg:text-2xl md:text-xl text-lg font-semibold text-gray-900">
                {heroImage.name}
              </h2>
              <p className="text-sm text-gray-600">
                Nhấn để mở slideshow kỷ niệm này nhé 💞
              </p>
            </div>
          </div>
        )}

        {/* Memories Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => {
            return (
              <div
                key={image.external_id}
                className="card card-hover cursor-pointer animate-slide-up flex flex-col h-full"
                onClick={() => openAlbum(image.path)}
              >
                <div className="relative overflow-hidden lg:rounded-xl md:rounded-xl rounded-md mb-4 h-56 sm:h-64">
                  {image.previewImage ? (
                    <img
                      src={image.previewImage}
                      alt={image.name}
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

                {/* <div className="inline-block bg-gradient-to-r from-pastel-pink to-pastel-purple text-white px-4 py-1 rounded-full text-sm font-semibold mb-3">
                  📅 {memory.date}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {memory.title}
                </h3>
                <p className="text-gray-700 leading-relaxed flex-1">
                  {memory.description}
                </p> */}
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
            Anh hứa sẽ luôn ở bên em, tạo ra thật nhiều khoảnh khắc tuyệt vời.
            Yêu em nhiều lắm! 💕💕💕
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
            <p className="text-3xl font-bold text-pastel-pink mb-1">∞</p>
            <p className="text-gray-600">Tình yêu</p>
          </div>

          <div className="card text-center card-hover">
            <div className="text-5xl mb-3">🌟</div>
            <p className="text-3xl font-bold text-pastel-blue mb-1">Forever</p>
            <p className="text-gray-600">Mãi mãi</p>
          </div>
        </div>
      </div>
      <Sliderdetail
        openModal={openModal}
        closeModal={closeModal}
        setOpenModal={setOpenModal}
        selectedAlbum={selectedAlbum ?? null}
      />
    </div>
  );
};

export default Memories;
