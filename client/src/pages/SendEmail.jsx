import DashboardPage from "./DashboardPage";
import { useRef, useState } from "react";
import EmailEditor from "react-email-editor";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "@/components/ui/label";
import useEmailStore from "../store/emailStroe";
import useUserStore from "../store/store";
import { ToasterMain } from "../components/Toaster";
import { useNavigate } from "react-router-dom";

const SendEmail = () => {
  const editorRef = useRef(null);
  const sendEmail = useEmailStore((state) => state.sendEmail);
  const results = useEmailStore((state) => state.results);
  const user = useUserStore((state) => state.user);
  const [subject, setSubject] = useState("");
  const [recipient, setRecipient] = useState("");
  const [recipients, setRecipients] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const html = await new Promise((resolve, reject) => {
        editorRef.current.editor.exportHtml((data) => {
          if (data?.html) {
            resolve(data.html);
          } else {
            reject("Failed to export HTML");
          }
        });
      });

      const response = await sendEmail(
        subject,
        recipients,
        html,
        user?.username
      );

      ToasterMain(
        response.message,
        "Email sent Successfully",
        response.success,
        "/logs",
        navigate
      );
      console.log(results);
    } catch (error) {
      console.log("Error sending email :::::", error);
      ToasterMain("Failed to send email", "Error", false);
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
    <div>
      <DashboardPage>
        <div className="flex flex-col gap-4 p-4 flex-1">
          <Label className="text-4xl py-5">Write a new email</Label>

          {/* Subject */}
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

          {/* Email editor */}
          <div className="border rounded-lg shadow-sm h-[70vh] w-full">
            <EmailEditor
              options={{
                appearance: {
                  theme: "dark",
                },
              }}
              ref={editorRef}
            />
          </div>

          {/* Recipients */}
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

            {/* List of added recipients */}
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

          {/* Buttons */}
          <div className="flex gap-3 self-end pt-10">
            <Button variant="outline">Save Email Template</Button>
            <Button onClick={handleSubmit}>Send Email</Button>
          </div>
        </div>
      </DashboardPage>
    </div>
  );
};

export default SendEmail;
