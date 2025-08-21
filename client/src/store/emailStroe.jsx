import { create } from "zustand";
import axios from "axios";
import { persist } from "zustand/middleware";
import { API_BASE } from "../constants/ApiUrl";
import useUserStore from "./store";

const useEmailStore = create(
  persist(
    (set) => ({
      results: null,
      loadingEmail: false,
      sendEmail: async (subject, to, html, admin) => {
        try {
          const token = useUserStore.getState().token;
          const res = await axios.post(
            `${API_BASE}/api/v1/email/send-email`,
            {
              subject,
              to,
              html,
              admin,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (res.data.success) {
            set({ results: res.data.results });
            console.log(res.data);
          } else {
            console.log("No success");
          }
          return res.data;
        } catch (error) {
          return error.response?.data;
        }
      },
      saveEmail: async (html, title) => {
        try {
          const token = useUserStore.getState().token;
          const res = await axios.post(
            `${API_BASE}/api/v1/email/create`,
            {
              html,
              title,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (res.data.success) {
            console.log("Email saved successfully");
            return res.data;
          } else {
            console.log("Error saving email");
            return res.data;
          }
        } catch (error) {
          return error.response?.data;
        }
      },
    }),
    { name: "email-storage" }
  )
);

export default useEmailStore;
