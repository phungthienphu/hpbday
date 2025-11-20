import client from "./client";

const getFolder = async (folderName: string) => {
  //https://bday-backend-five.vercel.app/cloudinary/folders?root=CUA
  const response = await client.get(`/cloudinary/folders?root=${folderName}`);
  return response.data;
};
///folders-with-preview
const getFoldersWithPreview = async (folderName: string) => {
  const response = await client.get(`/cloudinary/folders-with-preview?root=${folderName}`);
  return response.data;
};

const getImagesFromFolder = async (folderName: string) => {
  //https://bday-backend-five.vercel.app/cloudinary/images?folder=CUA/you
  const response = await client.get(`/cloudinary/images?folder=${folderName}`);
  return response.data;
};


export default {
  getImagesFromFolder,
  getFolder,
  getFoldersWithPreview,
};
