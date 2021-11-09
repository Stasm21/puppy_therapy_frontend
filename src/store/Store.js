import create from "zustand";
import axios from "axios";
import { apiUrl } from "./siteurl";

export const useStore = create((set) => ({
  accessToken: JSON.parse(localStorage.getItem("token")) || null,
  userInfo: JSON.parse(localStorage.getItem("user-info")) || null,
  mapLocation: null,
  setMapLocation: ({ lat, lng }) => {
    set((state) => ({ mapLocation: { lat, lng } }));
  },
  logOut: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user-info");

    set((state) => ({ accessToken: null, userInfo: null }));
  },
  setUserInfo: (token) => {
    axios.defaults.headers.common["Authorization"] = token && `Bearer ${token}`;
    axios
      .get(`${apiUrl}/api/puppy_user/`)
      .then((response) => {
        const resp = response.data[0];
        set((state) => ({ userInfo: resp }));

        localStorage.setItem("user-info", JSON.stringify(response.data[0]));
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("token");
        localStorage.removeItem("user-info");
      });
  },
  setAccessToken: (token) => {
    localStorage.setItem("token", JSON.stringify(token));
    set((state) => ({ accessToken: token }));
  },
}));
