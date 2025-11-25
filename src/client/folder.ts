import client from "./client";

const getFolders = async () => {
  const response = await client.get("/folders");
  return response.data;
};
// const createFolder = async (name: string, description: string, preview?: File | null) => {
//   //name, description
//   const response = await client.post("/folders/add", { name, description, preview });
//   return response.data;
// };
const createFolder = async (
  name: string,
  description: string,
  preview?: File | null
) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  if (preview) formData.append("preview", preview);

  const response = await client.post("/folders/add", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};
const deleteFolder = async (id: string) => {
  //delete/:id
  const response = await client.delete(`/folders/delete/${id}`);
  return response.data;
};
const updateFolder = async (
  id: string,
  name: string,
  description: string,
  preview?: File | null
) => {
  ///update/:id
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  if (preview) formData.append("preview", preview);
  const response = await client.patch(`/folders/update/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

////preview/:id
const createPreviewImage = async (id: string, preview: File) => {
  //preview
  const response = await client.post(`/folders/preview/${id}`, { preview });
  return response.data;
};
// const getPreviewImage = async (id: string) => {
//   const response = await client.get(`/folders/preview/${id}`);
//   return response.data;
// };
// const deletePreviewImage = async (id: string) => {
//   const response = await client.delete(`/folders/preview/${id}`);
//   return response.data;
// };
export default {
  getFolders,
  createFolder,
  deleteFolder,
  updateFolder,
  createPreviewImage,
};
