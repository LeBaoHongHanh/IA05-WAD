import axios from "axios";

const BASE_URL = "https://picsum.photos/v2";

export const fetchPhotos = async (page = 1, limit = 20) => {
  try {
    const res = await axios.get(`${BASE_URL}/list?page=${page}&limit=${limit}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw new Error("Failed to fetch photos. Please try again.");
  }
};

export const fetchPhotoDetail = async (id) => {
  try {
    const res = await axios.get(`https://picsum.photos/id/${id}/info`);
    return res.data;
  } catch (error) {
    console.error("Error fetching photo detail:", error);
    throw new Error("Failed to fetch photo details. Please try again.");
  }
};
