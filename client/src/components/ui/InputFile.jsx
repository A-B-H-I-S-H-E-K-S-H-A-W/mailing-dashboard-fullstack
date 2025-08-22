import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function InputFile({ onFilesChange }) {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    Promise.all(
      selectedFiles.map(
        (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () =>
              resolve({
                name: file.name,
                content: reader.result.split(",")[1],
              });
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
      )
    ).then((base64Files) => {
      setFiles(selectedFiles);
      onFilesChange(base64Files);
    });
  };

  return (
    <div className="grid w-full max-w-sm gap-3">
      <Label htmlFor="pictures">Upload Files</Label>

      <Input
        id="pictures"
        type="file"
        multiple
        onChange={handleFileChange}
        className="cursor-pointer"
        accept=".pdf, image/*"
      />

      {files.length > 0 && (
        <ul className="mt-2 list-disc pl-5 text-sm text-gray-600">
          {files.map((file, idx) => (
            <li key={idx}>
              {file.name} ({(file.size / 1024).toFixed(1)} KB)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
