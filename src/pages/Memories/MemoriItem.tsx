import { FaEdit, FaEllipsisH, FaTrash } from "react-icons/fa";
import { useState } from "react";
import ModalCustom from "../../components/Modal/modalCustom";
import ActionAlbum from "./ActionAlbum";
interface IFolder {
  _id: string;
  name: string;
  description: string;
  previewImage: string;
}

interface MemoriesItemProps {
  folder: IFolder;
  openAlbum: (folderId: string) => void;
  handleDelete: (folderId: string) => void;
  fetchFolders: () => void;
}
const MemoriesItem = ({
  folder,
  openAlbum,
  handleDelete,
  fetchFolders,
}: MemoriesItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  return (
    <div
      className="card relative card-hover cursor-pointer animate-slide-up flex flex-col h-full"
      onClick={() => {
        if (!isOpen) openAlbum(folder._id);
      }}
    >
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-transparent"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
        ></div>
      )}

      {/* MENU */}
      <div className="absolute z-50 top-2 right-2 shadow-sm rounded-full p-2 cursor-pointer">
        <FaEllipsisH
          className="w-5 h-5 text-gray-500"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          }}
        />

        {isOpen && (
          <ul
            className="absolute top-[100%] right-0 z-50 bg-white shadow-sm rounded-md p-2"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          >
            <li
              className="cursor-pointer px-4 hover:opacity-60 hover:bg-red-200 flex gap-2 items-center hover:text-red-500 justify-between"
              onClick={() => setModalDelete(true)}
            >
              <span className="text-sm text-gray-500">Delete</span>
              <FaTrash className="w-3 h-3 text-red-500" />
            </li>
            <li
              className="cursor-pointer px-4 flex items-center gap-2 hover:opacity-60 hover:bg-gray-200  hover:text-gray-500 justify-between"
              onClick={() => setModalEdit(true)}
            >
              <span className="text-sm text-gray-500">Edit</span>
              <FaEdit className="w-3 h-3 text-gray-500" />
            </li>
          </ul>
        )}
      </div>

      {/* CONTENT */}
      <div className="relative overflow-hidden lg:rounded-xl md:rounded-xl rounded-md mb-4 h-56 sm:h-64 z-10">
        {folder.previewImage ? (
          <img
            src={folder.previewImage}
            alt={folder.name}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
            No image
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 items-center z-10">
        <p className="text-gray-700 font-semibold">{folder.name}</p>
        <p className="text-gray-500">{folder.description}</p>
      </div>
      <ModalCustom
        title="Xóa album?"
        description="Chắc chắn muốn xóa album này chứ?"
        textLeft="Hủy"
        textRight="Xóa"
        show={modalDelete}
        onClose={() => setModalDelete(false)}
        onSubmit={() => handleDelete(folder._id)}
      />
      <ActionAlbum
        openModal={modalEdit}
        closeModal={() => setModalEdit(false)}
        fetchFolders={fetchFolders}
        initialFolder={folder}
      />
    </div>
  );
};

export default MemoriesItem;
