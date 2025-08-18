import zustand, { create } from "zustand";
import axios from "axios";

export const useUserStore = create({
  user: null,
  result: null,
  login: async () => {
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log("Error while login ::::", error.response?.data);
    }
  },
});
