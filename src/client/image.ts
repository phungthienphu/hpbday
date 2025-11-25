import client from "./client";

const getImagesFromFolder = async (folderId: string) => {
  ///folder/:folderId
  const response = await client.get(`/images/folder/${folderId}`);
  return response.data;
};
//router.post("/add", upload.array("files", 10), async (req, res) => {
const addImages = async (folderId: string, files: File[]) => {
  const formData = new FormData();
  formData.append("folderId", folderId);

  files.forEach((file) => {
    formData.append("files", file); // name trùng với backend: "files"
  });

  const response = await client.post("/images/add", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

//router.delete("/:id", async (req, res) => {
const deleteImage = async (imageId: string) => {
  const response = await client.delete(`/images/${imageId}`);
  return response.data;
};

export default {
  getImagesFromFolder,
  addImages,
  deleteImage,
};
