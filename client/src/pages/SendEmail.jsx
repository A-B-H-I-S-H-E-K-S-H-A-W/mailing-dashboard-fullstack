import DashboardPage from "./DashboardPage";
import { useRef } from "react";
import EmailEditor from "react-email-editor";
import { Button } from "../components/ui/button";

const SendEmail = () => {
  const editorRef = useRef(null);

  const exportHtml = () => {
    editorRef.current.editor.exportHtml((data) => {
      const { html } = data;
      console.log("Email HTML:", html);
    });
  };

  return (
    <div>
      <DashboardPage>
        <div className="flex flex-col gap-4 p-4 flex-1">
          <div className="border rounded-lg shadow-sm h-[70vh] w-full">
            <EmailEditor
              options={{
                appearance: {
                  theme: "dark", // ⚠️ not fully documented, might not affect everything
                },
              }}
              ref={editorRef}
            />
          </div>
          <Button onClick={exportHtml} className="self-end">
            Export & Send Email
          </Button>
        </div>
      </DashboardPage>
    </div>
  );
};

export default SendEmail;
