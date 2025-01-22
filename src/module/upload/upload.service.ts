import fs from "fs";
import path from "path";
import { pathToVideo } from "@/common/helper/consts/paths";

export class UploadService {
  async uploadVideo(file: Express.Multer.File): Promise<void> {
    return new Promise((resolve, reject) => {
      const writeStream = fs.createWriteStream(
        path.join(pathToVideo, file.originalname)
      );

      file.stream.on("error", (err) => {
        reject(err);
      });

      writeStream.on("error", (err) => {
        reject(err);
      });

      writeStream.on("finish", () => {
        resolve();
      });

      file.stream.pipe(writeStream);
    });
  }
}
