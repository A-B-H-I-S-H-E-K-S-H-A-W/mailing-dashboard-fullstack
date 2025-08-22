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
      sendEmail: async (subject, to, html, admin, files) => {
        try {
          const token = useUserStore.getState().token;
          const res = await axios.post(
            `${API_BASE}/api/v1/email/send-email`,
            {
              subject,
              to,
              html,
              admin,
              files,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (res.data.success) {
            set({ results: res.data.results });
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
      fetchEmail: async () => {
        try {
          const token = useUserStore.getState().token;
          const res = await axios.get(`${API_BASE}/api/v1/email/fetch`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.data.success) {
            console.log("Email fetched successfully");
            return res.data;
          } else {
            console.log("Error fetching email");
            return res.data;
          }
        } catch (error) {
          console.log("Error fetching email", error);
          return error.response?.data;
        }
      },
      deleteEmail: async (id) => {
        try {
          const token = useUserStore.getState().token;

          const res = await axios.delete(`${API_BASE}/api/v1/email/delete`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: { id },
          });

          if (res.data.success) {
            console.log("Email deleted successfully");
            return res.data;
          } else {
            console.log("Error deleting email");
            return res.data;
          }
        } catch (error) {
          console.log("Error fetching email", error);
          return error.response?.data;
        }
      },
    }),
    { name: "email-storage" }
  )
);

export default useEmailStore;
