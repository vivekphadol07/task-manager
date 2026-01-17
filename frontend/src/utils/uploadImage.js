import axiosInstance from "./axiosInstance";
import { API_PATHS } from "./apiPaths";

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile); // key MUST match multer

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error uploading image:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export default uploadImage;
