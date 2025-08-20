import { useState } from "react";
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
import Loader from "./Loader";
import useEmailStore from "../../store/emailStroe";
import { ToasterMain } from "../Toaster";
import { useNavigate } from "react-router-dom";

export function OneInputDailogBox({ editorRef }) {
  const [title, setTitle] = useState("");
  const saveEmail = useEmailStore((state) => state.saveEmail);
  const loadingEmail = useEmailStore((state) => state.loadingEmail);
  const navigate = useNavigate();

  const handleSaveEmail = async () => {
    try {
      useEmailStore.setState({ loadingEmail: true });
      const html = await new Promise((resolve, reject) => {
        editorRef.current.editor.exportHtml((data) => {
          if (data?.html) {
            resolve(data.html);
          } else {
            reject("Failed to export HTML");
          }
        });
      });

      const response = await saveEmail(html, title);

      if (response.success) {
        ToasterMain(
          response.message,
          "Email saved successfully",
          response.success,
          "/list-email",
          navigate
        );
      } else {
        ToasterMain(
          response.message,
          "Email not saved",
          response.success,
          "/list-email",
          navigate
        );
      }
    } catch (error) {
      console.log("Error saving email :::::", error);
      ToasterMain("Failed to save email", "Error", false);
    } finally {
      useEmailStore.setState({ loadingEmail: false });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Save Email Template</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Email</DialogTitle>
          <DialogDescription>
            Add a template name to save this email.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="templateName">Template Name</Label>
            <Input
              id="templateName"
              type="text"
              placeholder="Enter template name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSaveEmail} disabled={loadingEmail}>
            {loadingEmail ? <Loader /> : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
