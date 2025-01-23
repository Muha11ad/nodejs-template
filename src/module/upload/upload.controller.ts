import {
  responseOk,
  responseError,
} from "../../common/helper/utils/response.handler.js";
import multer from "multer";
import { UploadService } from "./upload.service.js";
import { UPLOAD_RESPONSE } from "../../common/helper/consts/uploadResponse.consts.js";

const upload = multer();

export class UploadController {
  private uploadService: UploadService;
  constructor(uploadService: UploadService) {
    this.uploadService = uploadService;
  }
  public async uploadVideo(req: any, res: any) {
    upload.single("video")(req, res, async (err: any) => {
      if (err) {
        return responseError(
          res,
          401,
          UPLOAD_RESPONSE.ERROR_WHILE_UPLOADING,
          err
        );
      }
      try {
        const file = req.file;
        await this.uploadService.uploadVideo(file);
        responseOk(res, 200, UPLOAD_RESPONSE.SUCCESSFULY_UPLOADED);
      } catch (error) {
        responseError(res, 500, UPLOAD_RESPONSE.ERROR_WHILE_UPLOADING, error);
      }
    });
  }
}
