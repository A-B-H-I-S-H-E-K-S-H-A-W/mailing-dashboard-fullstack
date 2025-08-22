import fs from "fs/promises";

export async function UnLinkFiles(files) {
  try {
    for (const file of files) {
      await fs.unlink(file.path);
    }
  } catch (error) {
    console.log("Failed to delete temp files");
  }
}
