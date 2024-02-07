import axios from "axios";

// export const BASE_URL = "https://youtube-v31.p.rapidapi.com";
// export const BASE_URL = "https://doodapi.com";
export const BASE_URL = "https://corsanywhere-1-f0730614.deta.app/https://doodapi.com/";
export const VIDEO_BASE_URL = "https://doodapi.com";

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`);
  return data;
};
