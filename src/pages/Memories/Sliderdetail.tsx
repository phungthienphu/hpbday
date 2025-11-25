import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setLoading } from "../../features/authSlice";
import { setError, setSuccess } from "../../features/uiSlice";
import image from "../../client/image";
import { GalleryImages, type GalleryImage } from "./Carousel";

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
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const touchStartRef = useRef<number | null>(null);
  const dispatch = useDispatch();

  const fetchImagesFromAlbum = useCallback(async () => {
    if (!selectedAlbum) return;
    const response = await image.getImagesFromFolder(selectedAlbum);
    setImages(response as GalleryImage[]);
  }, [selectedAlbum]);

  useEffect(() => {
    if (!openModal || !selectedAlbum) return;
    const loadImages = async () => {
      try {
        dispatch(setLoading(true));
        await fetchImagesFromAlbum();
      } catch (error) {
        console.error(error);
        dispatch(setError("Không thể tải ảnh, thử lại sau nhé!"));
      } finally {
        dispatch(setLoading(false));
      }
    };
    loadImages();
  }, [dispatch, openModal, selectedAlbum, fetchImagesFromAlbum]);

  useEffect(() => {
    if (!openModal) {
      setImages([]);
      setPreviewIndex(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [openModal]);

  useEffect(() => {
    if (!images.length) {
      setPreviewIndex(null);
      return;
    }
    if (previewIndex !== null && previewIndex >= images.length) {
      setPreviewIndex(images.length - 1);
    }
  }, [images, previewIndex]);
  const handleAddImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleUploadChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files?.length || !selectedAlbum) return;

    try {
      dispatch(setLoading(true));

      // Convert FileList -> File[]
      const fileArray = Array.from(files);

      // Gọi API upload
      await image.addImages(selectedAlbum, fileArray);

      // Cập nhật lại list ảnh
      await fetchImagesFromAlbum();

      dispatch(setSuccess("Đã thêm ảnh mới vào album!"));
    } catch (error) {
      console.error(error);
      dispatch(setError("Không thể thêm ảnh, thử lại sau nhé!"));
    } finally {
      dispatch(setLoading(false));
      // Reset input để có thể upload lại cùng file
      event.target.value = "";
    }
  };

  const openPreview = useCallback(
    (index: number) => {
      if (!images.length) return;
      setPreviewIndex(index);
    },
    [images.length]
  );

  const closePreview = useCallback(() => setPreviewIndex(null), []);

  const showPrevious = useCallback(() => {
    setPreviewIndex((prev) => {
      if (prev === null || !images.length) return prev;
      return (prev - 1 + images.length) % images.length;
    });
  }, [images.length]);

  const showNext = useCallback(() => {
    setPreviewIndex((prev) => {
      if (prev === null || !images.length) return prev;
      return (prev + 1) % images.length;
    });
  }, [images.length]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartRef.current = event.changedTouches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartRef.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartRef.current;
    if (Math.abs(delta) > 40) {
      if (delta > 0) {
        showPrevious();
      } else {
        showNext();
      }
    }
    touchStartRef.current = null;
  };

  const previewImage =
    previewIndex !== null && images[previewIndex] ? images[previewIndex] : null;

  const handleDialogClose = useCallback(() => {
    closeModal();
    setImages([]);
    setPreviewIndex(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [closeModal]);

  useEffect(() => {
    if (previewIndex === null) return undefined;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      } else if (event.key === "Escape") {
        event.preventDefault();
        closePreview();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [previewIndex, showPrevious, showNext, closePreview]);

  return (
    <Transition appear show={openModal} as={Fragment}>
      <Dialog as="div" className="relative z-[120]" onClose={handleDialogClose}>
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
              <Dialog.Panel className="w-full max-w-3xl py-2 rounded-xl bg-white sm:p-6 shadow-2xl space-y-5">
                <Dialog.Title className="text-center text-xl font-semibold text-gray-900">
                  Bộ sưu tập kỷ niệm
                </Dialog.Title>
                <GalleryImages
                  images={images}
                  onAddImage={handleAddImageClick}
                  onSelectImage={openPreview}
                  fetchImagesFromAlbum={fetchImagesFromAlbum}
                />
                <div className="flex justify-center w-full gap-3">
                  <button
                    onClick={handleDialogClose}
                    className="w-1/2 md:w-1/3 mx-auto py-2 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
                  >
                    Đóng lại
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          multiple
          onChange={handleUploadChange}
        />
      </Dialog>
      <Transition appear show={!!previewImage} as={Fragment}>
        <Dialog as="div" className="relative z-[130]" onClose={closePreview}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/70" />
          </Transition.Child>
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-4xl rounded-2xl bg-black/80 p-4">
                <button
                  type="button"
                  onClick={closePreview}
                  className="absolute top-4 right-4 text-white/80 z-50 hover:text-white transition"
                  aria-label="Đóng xem ảnh"
                >
                  <FiX className="w-6 h-6" />
                </button>
                {previewImage ? (
                  <div
                    className="relative flex items-center justify-center"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                  >
                    {images.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={showPrevious}
                          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition"
                          aria-label="Ảnh trước"
                        >
                          <FiChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          type="button"
                          onClick={showNext}
                          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition"
                          aria-label="Ảnh tiếp theo"
                        >
                          <FiChevronRight className="w-6 h-6" />
                        </button>
                      </>
                    )}
                    <img
                      src={previewImage.url}
                      alt={previewImage._id}
                      className="max-h-[70vh] w-full object-contain rounded-xl"
                    />
                  </div>
                ) : (
                  <div className="flex items-center min-h-[70vh] justify-center">
                    <p className="text-white text-lg font-semibold"></p>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Transition>
  );
};

export default Sliderdetail;
