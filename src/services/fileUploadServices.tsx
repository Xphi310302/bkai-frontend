// import axios from "axios";

// const CLOUDINARY_NAME = import.meta.env.VITE_CLOUDINARY_NAME;
// const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET; // Correct environment variable

// export const uploadToCloudinary = async (file: File): Promise<string> => {
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", UPLOAD_PRESET); // Required for unsigned uploads

//   try {
//     const response = await axios.post(
//       `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`,
//       formData
//     );
//     const url = response.data.url; // Changed to get public URL
//     // console.log(url);
//     return url; // URL of the uploaded image
//   } catch (error) {
//     console.error("Upload failed:", error);
//     throw error;
//   }
// };
import axios from "axios";

const CLOUDINARY_NAME = import.meta.env.VITE_CLOUDINARY_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET; // Correct environment variable

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET); // Required for unsigned uploads

  // Determine resource type based on file type
  const resourceType = file.type.startsWith("image/") ? "image" : "raw";

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/upload`, // Changed to /upload for general use
      formData,
      {
        params: {
          resource_type: resourceType, // Set resource type based on file type
        },
      }
    );
    const url = response.data.url; // Changed to get public URL
    return url; // URL of the uploaded file
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};
