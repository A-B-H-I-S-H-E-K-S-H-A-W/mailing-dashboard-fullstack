import { create } from "zustand";
import axios from "axios";
import { persist } from "zustand/middleware";
import { API_BASE } from "../constants/ApiUrl";

const useUserStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      loading: null,
      result: null,

      login: async (email, password) => {
        try {
          const res = await axios.post(`${API_BASE}/api/v1/auth/login`, {
            email,
            password,
          });
          set({ token: res.data.token, user: res.data.admin });
          localStorage.setItem("adminToken", res.data.token);
          return res.data;
        } catch (error) {
          return error.response?.data;
        }
      },

      logout: () => {
        localStorage.removeItem("adminToken");
        set({ token: null, user: null });
      },
    }),
    { name: "user-storage" }
  )
);

export default useUserStore;
