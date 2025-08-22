import fs from "fs/promises";
import path from "path";
import { Buffer } from "buffer";

export async function UploadFiles(files) {
  try {
    let savedFiles = [];
    if (files && Array.isArray(files)) {
      const uploadDir = path.join(process.cwd(), "uploads");
      await fs.mkdir(uploadDir, { recursive: true });

      for (const file of files) {
        const filePath = path.join(uploadDir, file.name);
        const buffer = Buffer.from(file.content, "base64");
        await fs.writeFile(filePath, buffer);
        savedFiles.push({ path: filePath, filename: file.name });
      }
    }
    return savedFiles;
  } catch (error) {
    console.error("Error saving files:", error);
    throw error;
  }
}
