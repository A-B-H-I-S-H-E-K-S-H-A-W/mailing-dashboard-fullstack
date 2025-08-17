import React, { useRef } from "react";
import EmailEditor from "react-email-editor";
import { Button } from "./ui/button";

export default function EmailBuilder() {
  const editorRef = useRef(null);

  const exportHtml = () => {
    editorRef.current.editor.exportHtml((data) => {
      const { html } = data;
      console.log("Email HTML:", html);
    });
  };

  return (
    <div className="flex flex-col gap-4 p-4 flex-1">
      <div className="border rounded-lg shadow-sm h-[80vh] w-full">
        <EmailEditor ref={editorRef} />
      </div>
      <Button onClick={exportHtml} className="self-end">
        Export & Send Email
      </Button>
    </div>
  );
}
