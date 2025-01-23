import * as url from "url";
import { IncomingMessage, ServerResponse } from "http";
import { METHODS } from "./common/helper/consts/methods.js";
import { UserService } from "./module/user/user.service.js";
import { PATHNAME } from "./common/helper/consts/pathNames.js";
import { UploadService } from "./module/upload/upload.service.js";
import { UserController } from "./module/user/user.controller.js";
import { UploadController } from "./module/upload/upload.controller.js";

export class Router {
  pathname: string;
  res: ServerResponse;
  req: IncomingMessage;
  userController: UserController;
  uploadController: UploadController;

  constructor(req: IncomingMessage, res: ServerResponse) {
    this.req = req;
    this.res = res;
    this.userController = new UserController(new UserService());
    this.uploadController = new UploadController(new UploadService());
    this.pathname = url.parse(req.url || "", true).pathname || "";
  }
  private renderUserRouter() {
    if (this.req.method == METHODS.GET) {
      this.userController.getAll(this.req, this.res);
    } else if (this.req.method == METHODS.POST) {
      this.userController.create(this.req, this.res);
    } else if (this.req.method == METHODS.PUT) {
      this.userController.update(this.req, this.res);
    } else if (this.req.method == METHODS.DELETE) {
      this.userController.delete(this.req, this.res);
    }
  }
  private renderUploadRouter() {
    if (this.req.method == METHODS.POST) {
      this.uploadController.uploadVideo(this.req, this.res);
    }
  }

  public renderRoutes() {
    if (this.pathname.startsWith(PATHNAME.users)) {
      this.renderUserRouter();
    } else if (this.pathname.startsWith(PATHNAME.upload)) {
      this.renderUploadRouter();
    } else {
      this.res.writeHead(404, { "Content-Type": "application/json" });
      this.res.write(JSON.stringify({ message: "Not Found" }));
      this.res;
    }
  }
}
