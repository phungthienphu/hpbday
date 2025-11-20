import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import cloudinary from "../../client/cloudinary";
import { setLoading } from "../../features/authSlice";
import { useDispatch } from "react-redux";
interface IImageItem {
  public_id: string;
  resource_type: string;
  url: string;
}
import { useSwiper } from "swiper/react";

function SwiperButtons() {
  const swiper = useSwiper();

  return (
    <div className="flex lg:gap-9 gap-3 w-full mt-3 justify-center">
      <button
        onClick={() => swiper.slidePrev()}
        className="w-8 h-8 rounded-full bg-gray-800 text-white"
      >
        ←
      </button>

      <button
        onClick={() => swiper.slideNext()}
        className="w-8 h-8 rounded-full bg-gray-800 text-white"
      >
        →
      </button>
    </div>
  );
}

const Sliderdetail = ({
  selectedAlbum,
  closeModal,
  openModal,
}: {
  selectedAlbum: string | null;
  closeModal: () => void;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}) => {
  const [images, setImages] = useState<IImageItem[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchImagesFromAlbum = async () => {
      try {
        dispatch(setLoading(true));
        const response = await cloudinary.getImagesFromFolder(
          selectedAlbum ?? ""
        );
        const images = response;
        console.log(images.images);
        setImages(images.images as IImageItem[]);
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    if (selectedAlbum != "") {
      fetchImagesFromAlbum();
    }
  }, [openModal, selectedAlbum]);
  return (
    <Transition appear show={openModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[120]"
        onClose={() => {
          closeModal();
          setImages([]);
        }}
      >
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
                  {images.find((m) => m.public_id === selectedAlbum)?.public_id}
                </Dialog.Title>
                <div>
                  {images.length > 0 ? (
                    <Swiper
                      modules={[Navigation, Autoplay]}
                      // navigation
                      autoplay={{ delay: 2000, disableOnInteraction: false }}
                      loop
                      className="rounded-0 overflow-hidden cursor-grab"
                    >
                      {images.map((src, idx) => (
                        <SwiperSlide key={`${src.public_id}-${idx}`}>
                          <div className="mx-auto w-full max-w-[420px] aspect-square bg-gray-100  overflow-hidden flex items-center justify-center ">
                            <img
                              src={src.url}
                              alt=""
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                      <SwiperButtons />
                    </Swiper>
                  ) : (
                    <p className="text-center h-[300px] max-h-full max-w-full  text-gray-500 py-10">
                      Chưa có ảnh nào trong kỷ niệm này.
                    </p>
                  )}
                </div>

                <div className="flex justify-center w-full">
                  <button
                    onClick={closeModal}
                    className="w-3/4 lg:w-full md:w-3/4 mx-auto py-2 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
                  >
                    Đóng lại
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Sliderdetail;
