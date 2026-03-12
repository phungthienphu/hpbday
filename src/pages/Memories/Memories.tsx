import { useMemo, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import Sliderdetail from "./Sliderdetail";
import folder from "../../api/folder";
import ImagePreview from "../../components/ImagePreview";
import { FaPlus } from "react-icons/fa";
import ActionAlbum from "./ActionAlbum";
import { setGlobalLoading } from "../../features/uiSlice";
import { setSuccess } from "../../features/uiSlice";
import MemoriesItem from "./MemoriItem";
import type { IFolder } from "../../types/folder";

const HERO_SEED = Math.random();

const Memories = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [selectedAlbum, setSelectedAlbum] = useState<string>();
  const [openModal, setOpenModal] = useState(false);
  const [folders, setFolders] = useState<IFolder[]>([]);
  const [modalAction, setModalAction] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const heroImage = useMemo<IFolder | null>(() => {
    if (!folders.length) return null;
    const idx = Math.floor(HERO_SEED * folders.length) % folders.length;
    return folders[idx];
  }, [folders]);

  const openAlbum = (albumId: string) => {
    setSelectedAlbum(albumId);
    setOpenModal(true);
  };
  const closeModal = () => {
    setSelectedAlbum("");
    setOpenModal(false);
  };
  const fetchFolders = async () => {
    try {
      dispatch(setGlobalLoading(true));
      const response = await folder.getFolders();
      setFolders(response as IFolder[]);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setGlobalLoading(false));
    }
  };
  const handleDelete = async (folderId: string) => {
    try {
      dispatch(setGlobalLoading(true));
      await folder.deleteFolder(folderId);
      dispatch(setSuccess("Album đã được xóa thành công"));
      fetchFolders();
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setGlobalLoading(false));
    }
  };
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
    fetchFolders();
  }, []);

  return (
    <div className="container mx-auto  lg:px-4 md:px-4 px:1 lg:py-12 md:py-12 py-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Hero */}
        {heroImage && (
          <div
            className="card animate-fade-in flex flex-col md:flex-row items-center gap-6 cursor-pointer"
            onClick={() => openAlbum(heroImage._id)}
          >
            <div className="relative w-full md:w-1/2 h-56 md:h-72 overflow-hidden lg:rounded-lg md:rounded-lg rounded-md">
              {heroImage.previewImage ? (
                <img
                  src={heroImage.previewImage}
                  alt={heroImage.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImagePreview imageName={heroImage.name} />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="text-center md:text-left space-y-3 md:w-1/2">
              <p className="text-xs tracking-[0.3em] uppercase text-gray-500">
                Featured album
              </p>
              <h2 className="lg:text-2xl md:text-xl text-lg font-semibold text-gray-900">
                {heroImage.name}
              </h2>
              <p className="text-sm text-gray-600">
                Nhấn để mở slideshow album này nhé 💞
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-end w-full">
          <button
            onClick={() => setModalAction(true)}
            className="bg-pastel-pink text-white px-4 py-4 rounded-md flex justify-center items-center gap-2 cursor-pointer w-full shadow-sm hover:opacity-90 hover:text-gray-600"
          >
            <FaPlus className="w-6 h-6 " />
            <span className="">Thêm album</span>
          </button>
        </div>
        {/* Memories Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {folders.map((folder) => {
            return (
              <MemoriesItem
                key={folder._id}
                folder={folder}
                openAlbum={openAlbum}
                handleDelete={handleDelete}
                fetchFolders={fetchFolders}
              />
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
              {folders.length}
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
      <ActionAlbum
        openModal={modalAction}
        closeModal={() => setModalAction(false)}
        fetchFolders={fetchFolders}
      />
    </div>
  );
};

export default Memories;
