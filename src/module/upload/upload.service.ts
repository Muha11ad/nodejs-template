import fs from "fs";
import path from "path";
import { Readable } from "stream";
import { pathToVideo } from "../../common/helper/consts/paths.js";

export class UploadService {
  async uploadVideo(file: Express.Multer.File): Promise<void> {
    return new Promise((resolve, reject) => {
      const filePath = path.join(pathToVideo, file.originalname);
      const readableStream = new Readable();
      readableStream._read = () => {};
      readableStream.push(file.buffer);
      readableStream.push(null);

      const writeStream = fs.createWriteStream(filePath);

      readableStream.on("error", (err) => {
        reject(err);
      });

      writeStream.on("error", (err) => {
        reject(err);
      });

      writeStream.on("finish", () => {
        resolve();
      });

      readableStream.pipe(writeStream);
    });
  }
}
