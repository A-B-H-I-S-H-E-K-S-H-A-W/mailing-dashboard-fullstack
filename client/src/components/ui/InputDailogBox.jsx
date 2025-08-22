import { useState } from "react";
import useUserStore from "../../store/store";
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
import { Button } from "./button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "./input";
import useEmailStore from "../../store/emailStroe";
import { ToasterMain } from "../Toaster";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { InputFile } from "./InputFile";

export function InputDailogBox({ emailData }) {
  const loading = useUserStore((state) => state.loading);
  const [attachments, setAttachments] = useState([]);
  const sendEmail = useEmailStore((state) => state.sendEmail);
  const user = useUserStore((state) => state.user);
  const [subject, setSubject] = useState("");
  const [recipient, setRecipient] = useState("");
  const [recipients, setRecipients] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      useUserStore.setState({ loading: true });

      const response = await sendEmail(
        subject,
        recipients,
        emailData?.html,
        user.username,
        attachments
      );

      if (response.success) {
        ToasterMain(
          response.message,
          "Email sent Successfully",
          true,
          "/logs",
          navigate
        );
      } else {
        ToasterMain(
          response.message,
          "Failed to send email",
          false,
          "/logs",
          navigate
        );
      }
    } catch (error) {
      console.log("Error sending email :::::", error);
      ToasterMain("Failed to send email", "Error", false);
    } finally {
      useUserStore.setState({ loading: false });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Send Email</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send Email - {emailData?.title}</DialogTitle>
          <DialogDescription>
            You are about to send this saved email template.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              name="subject"
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
              <Button
                type="button"
                onClick={() => {
                  if (recipient) {
                    setRecipients([...recipients, recipient]);
                    setRecipient("");
                  }
                }}
              >
                Add
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {recipients.map((email, idx) => (
              <span
                key={idx}
                className="flex items-center bg-accent px-2 py-1 rounded-full text-sm"
              >
                {email}
                <button
                  onClick={() =>
                    setRecipients(recipients.filter((r) => r !== email))
                  }
                  className="ml-2 text-destructive hover:text-destructive"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <InputFile onFilesChange={setAttachments} />
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
    </Dialog>
  );
}
