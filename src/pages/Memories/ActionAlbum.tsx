import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import folder from "../../client/folder";
import { setLoading } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import { setSuccess } from "../../features/uiSlice";
interface IFolder {
  _id: string;
  name: string;
  description: string;
  previewImage: string;
}
interface ActionAlbumProps {
  openModal: boolean;
  closeModal: () => void;
  fetchFolders: () => void;
  initialFolder?: IFolder;
}

const ActionAlbum = ({
  openModal,
  closeModal,
  fetchFolders,
  initialFolder,
}: ActionAlbumProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const AlbumFormik = useFormik({
    initialValues: {
      Name: "",
      Description: "",
      previewFile: null as File | null,
    },
    validationSchema: Yup.object().shape({
      Name: Yup.string().required("Tên album là bắt buộc"),
      Description: Yup.string().required("Mô tả là bắt buộc"),
      previewFile: Yup.mixed().required("Ảnh preview là bắt buộc"),
    }),
    onSubmit: (values) => {
      console.log(values);
      CreateFolder();
    },
  });
  const CreateFolder = async () => {
    try {
      dispatch(setLoading(true));
      if (initialFolder) {
        await folder.updateFolder(
          initialFolder._id,
          AlbumFormik.values.Name,
          AlbumFormik.values.Description,
          AlbumFormik.values.previewFile
        );
      } else {
        await folder.createFolder(
          AlbumFormik.values.Name,
          AlbumFormik.values.Description,
          AlbumFormik.values.previewFile
        );
      }
      dispatch(setSuccess("Album đã được tạo thành công"));
    } catch (error) {
      console.log(error);
    } finally {
      closeModal();
      fetchFolders();
      dispatch(setLoading(false));
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      AlbumFormik.setFieldValue("previewFile", file);
    }
  };

  useEffect(() => {
    if (openModal) {
      if (initialFolder) {
        AlbumFormik.setFieldValue("Name", initialFolder.name);
        AlbumFormik.setFieldValue("Description", initialFolder.description);
        AlbumFormik.setFieldValue("previewFile", initialFolder.previewImage);
      } else {
        AlbumFormik.setValues({
          Name: "",
          Description: "",
          previewFile: null as File | null,
        });
      }
    }
  }, [initialFolder, openModal]);

  return (
    <Transition appear show={openModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[100] max-h-[400px] overflow-y-auto"
        onClose={closeModal}
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
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
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
            <Dialog.Panel className="bg-white rounded-xl max-w-md w-full p-6 relative">
              {/* Nút đóng X */}
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>

              <Dialog.Title className="text-lg font-semibold mb-4">
                {folder ? "Sửa Album" : "Thêm Album Mới"}
              </Dialog.Title>

              <form onSubmit={AlbumFormik.handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Tên Album
                  </label>
                  <input
                    type="text"
                    value={AlbumFormik.values.Name}
                    onChange={AlbumFormik.handleChange}
                    onBlur={AlbumFormik.handleBlur}
                    className="w-full border rounded-md p-2"
                    required
                    name="Name"
                    placeholder="Tên Album"
                  />
                  {AlbumFormik.errors.Name && AlbumFormik.touched.Name && (
                    <p className="text-red-500 text-sm">
                      {AlbumFormik.errors.Name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Mô tả
                  </label>
                  <textarea
                    value={AlbumFormik.values.Description}
                    name="Description"
                    placeholder="Mô tả Album"
                    onChange={AlbumFormik.handleChange}
                    onBlur={AlbumFormik.handleBlur}
                    className="w-full border rounded-md p-2"
                  />
                  {AlbumFormik.errors.Description &&
                    AlbumFormik.touched.Description && (
                      <p className="text-red-500 text-sm">
                        {AlbumFormik.errors.Description}
                      </p>
                    )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Ảnh Preview
                  </label>
                  <input
                    ref={fileInputRef as React.RefObject<HTMLInputElement>}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    onBlur={AlbumFormik.handleBlur}
                    className={AlbumFormik.values.previewFile ? "hidden" : ""}
                  />
                  {AlbumFormik.values.previewFile && (
                    <div className="mt-2 relative w-full h-[300px] object-contain rounded-md bg-slate-300">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          AlbumFormik.setFieldValue(
                            "previewFile",
                            null as File | null
                          );
                          if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                          }
                        }}
                        className="absolute top-2 right-2 "
                      >
                        <FaTimes className="w-4 h-4" />
                      </button>
                      <img
                        src={
                          initialFolder?.previewImage ||
                          URL.createObjectURL(AlbumFormik.values.previewFile) ||
                          ""
                        }
                        alt="Preview"
                        className="mt-2 w-full h-full object-contain rounded-md"
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    {initialFolder ? "Lưu" : "Thêm Album"}
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ActionAlbum;
