import { create } from "zustand";
import axios from "axios";

const useUserStore = create((set) => ({
  user: null,
  result: null,
  login: async (email, password) => {
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log("Error while login ::::", error.response?.data);
      return error.response?.data;
    }
  },
}));

export default useUserStore;
