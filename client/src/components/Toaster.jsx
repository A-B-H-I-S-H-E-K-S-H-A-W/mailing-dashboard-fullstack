import { toast } from "sonner";

export function ToasterMain(
  message,
  title,
  success = true,
  redirectTo,
  navigate,
  showToast = true
) {
  if (showToast) {
    toast(title, {
      className: `${success ? "bg-secondary" : "bg-destructive"}`,
      description: message,
      duration: 8000,
      action: {
        label: "Show logs",
        onClick: () => navigate(redirectTo),
      },
    });
  }
}
