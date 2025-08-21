import { create } from "zustand";
import axios from "axios";
import { persist } from "zustand/middleware";
import { API_BASE } from "../constants/ApiUrl";

const useUserStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      loading: false,
      result: null,

      login: async (email, password) => {
        set({ loading: true, result: null });

        try {
          if (!email || !password) {
            set({ loading: false });
            return {
              success: false,
              message: "Email or password not found",
            };
          }

          const res = await axios.post(`${API_BASE}/api/v1/auth/login`, {
            email,
            password,
          });

          set({
            token: res.data.token,
            user: res.data.admin,
            loading: false,
          });

          localStorage.setItem("adminToken", res.data.token);
          return res.data;
        } catch (error) {
          set({
            loading: false,
          });
          return error.response?.data;
        }
      },

      logout: () => {
        localStorage.removeItem("adminToken");
        set({ token: null, user: null, result: null });
      },
    }),
    { name: "user-storage" }
  )
);

export default useUserStore;
