import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import clsx from "clsx";
import { FaPlus } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import ModalCustom from "../../components/Modal/modalCustom";
import { useCallback, useState } from "react";
import { setLoading } from "../../features/authSlice";
import image from "../../client/image";
import { setError } from "../../features/uiSlice";
import { setSuccess } from "../../features/uiSlice";
import { useDispatch } from "react-redux";

export interface GalleryImage {
  _id: string;
  url: string;
}

interface GalleryImagesProps {
  images: GalleryImage[];
  onAddImage: () => void;
  onSelectImage: (index: number) => void;
  fetchImagesFromAlbum: () => void;
}

export function GalleryImages({
  images,
  onAddImage,
  onSelectImage,
  fetchImagesFromAlbum,
}: GalleryImagesProps) {
  const [modalDeleteImage, setModalDeleteImage] = useState(false);
  const [imageId, setImageId] = useState<string | null>(null);
  const dispatch = useDispatch();
  const handleDeleteImage = useCallback(async () => {
    if (!imageId) return;
    try {
      dispatch(setLoading(true));
      await image.deleteImage(imageId);
      dispatch(setSuccess("Ảnh đã được xóa thành công"));
      fetchImagesFromAlbum();
    } catch (error) {
      console.error(error);
      dispatch(setError("Không thể xóa ảnh, thử lại sau nhé!"));
    } finally {
      dispatch(setLoading(false));
      setImageId(null);
      setModalDeleteImage(false);
    }
  }, [dispatch, fetchImagesFromAlbum, imageId]);

  return (
    <div className="w-full">
      <ImageList
        variant="standard"
        cols={3}
        gap={12}
        sx={{
          width: "100%",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(140px, 1fr))!important",
          "& .MuiImageListItem-root": {
            borderRadius: "12px",
            overflow: "hidden",
            position: "relative",
          },
        }}
      >
        <ImageListItem key="add-image" cols={1} rows={1} className="!h-36">
          <button
            type="button"
            onClick={onAddImage}
            className="w-full h-full border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-500 hover:border-pastel-pink hover:text-pastel-pink transition focus:outline-none focus-visible:ring-2 focus-visible:ring-pastel-pink/70"
          >
            <FaPlus className="w-6 h-6 mb-2" />
            <span className="text-sm font-semibold">Thêm ảnh</span>
          </button>
        </ImageListItem>
        {images.map((img, index) => (
          <ImageListItem
            key={img._id ?? `image-${index}`}
            cols={1}
            rows={1}
            className={clsx(
              "cursor-pointer relative group !h-36",
              !img.url && "bg-gray-100"
            )}
            onClick={() => onSelectImage(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelectImage(index);
              }
            }}
          >
            {img.url ? (
              <img
                src={img.url}
                alt={img._id ?? `Ảnh ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                Đang tải...
              </div>
            )}
            <div
              className="absolute z-50 top-2 right-2 hover:text-red-500 cursor-pointer"
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                e.stopPropagation();
                setModalDeleteImage(true);
                console.log(img);
                setImageId(img._id);
              }}
            >
              <FiTrash2 className="w-4 h-4" />
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center">
              <span className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition">
                Nhấn để xem
              </span>
            </div>
          </ImageListItem>
        ))}
      </ImageList>
      {!images.length && (
        <p className="text-center text-sm text-gray-500 mt-2">
          Chưa có hình ảnh nào.
        </p>
      )}
      <ModalCustom
        title="Xóa ảnh?"
        description="Chắc chắn muốn xóa ảnh này chứ?"
        textLeft="Hủy"
        textRight="Xóa"
        show={modalDeleteImage}
        onClose={() => setModalDeleteImage(false)}
        onSubmit={handleDeleteImage}
      />
    </div>
  );
}
