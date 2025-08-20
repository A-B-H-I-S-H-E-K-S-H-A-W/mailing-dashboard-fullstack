import { create } from "zustand";
import axios from "axios";
import { persist } from "zustand/middleware";

const useEmailStore = create(
  persist(
    (set) => ({
      results: null,
      sendEmail: async (subject, to, html, admin) => {
        try {
          const res = await axios.post("/api/v1/email/send-email", {
            subject,
            to,
            html,
            admin,
          });

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
      saveEmail: async (html) => {
        try {
          const res = await axios.post("/api/v1/email/create", {
            html,
          });

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
