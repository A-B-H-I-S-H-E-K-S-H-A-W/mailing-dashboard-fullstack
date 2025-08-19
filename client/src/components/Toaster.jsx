"use client";

import { toast } from "sonner";

export function ToasterMain(message, title, success = true, showToast = true) {
  if (showToast) {
    toast(title, {
      className: `${success ? "bg-secondary" : "bg-destructive"}`,
      description: message,
      action: {
        label: "Close",
        onClick: () => console.log("CLOSE"),
      },
    });
  }
}
