import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToasterMain } from "../Toaster";
import useUserStore from "../../store/store";
import Loader from "./Loader";
import { useState } from "react";

export function InputDailogBox() {
  const loading = useUserStore((state) => state.loading);
  const [subject, setSubject] = useState("");
  const [recipient, setRecipient] = useState("");
  const [recipients, setRecipients] = useState([]);

  const handleSubmit = async () => {
    try {
      useUserStore.setState({ loading: true });

      const response = await sendEmail(
        subject,
        recipients,
        html,
        user?.username
      );

      if (response.success) {
        ToasterMain(
          response.message,
          "Email sent Successfully",
          response.success,
          "/logs",
          navigate
        );
      } else {
        ToasterMain(
          response.message,
          "Falied to send email",
          response.success,
          "/logs",
          navigate
        );
      }
      console.log(results);
    } catch (error) {
      console.log("Error sending email :::::", error);
      ToasterMain("Failed to send email", "Error", false);
    } finally {
      useUserStore.setState({ loading: false });
    }
  };

  const addRecipient = () => {
    if (
      recipient &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient) &&
      !recipients.includes(recipient)
    ) {
      setRecipients([...recipients, recipient]);
      setRecipient("");
    }
  };

  const removeRecipient = (email) => {
    setRecipients(recipients.filter((r) => r !== email));
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Save Email Template</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Send Email</DialogTitle>
            <DialogDescription>
              Add Subject and Recipient to send email.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                type="text"
                placeholder="Enter email subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">To</Label>
              <div className="flex gap-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter recipient email"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
                <Button onClick={addRecipient}>Add</Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {recipients.map((email, idx) => (
                <span
                  key={idx}
                  className="flex items-center bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full text-sm"
                >
                  {email}
                  <button
                    onClick={() => removeRecipient(email)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSubmit}>
              {loading ? <Loader /> : "Send Email"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
