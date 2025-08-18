import { create } from "zustand";
import axios from "axios";

const useUserStore = create((set) => ({
  token: null,
  user: null,
  loading: false,
  result: null,
  login: async (email, password) => {
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });

      set({ token: res.data.token });
      localStorage.setItem("adminToken", res.data.token);

      return res.data;
    } catch (error) {
      return error.response?.data;
    }
  },
}));

export default useUserStore;
