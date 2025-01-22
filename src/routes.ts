import * as url from "url";
import { IncomingMessage, ServerResponse } from "http";
import { METHODS } from "./common/helper/consts/methods.js";
import { UserService } from "./module/user/user.service.js";
import { PATHNAME } from "./common/helper/consts/pathNames.js";
import { UserController } from "./module/user/user.controller.js";

export class Router {
  pathname: string;
  res: ServerResponse;
  req: IncomingMessage;
  userController: UserController;

  constructor(req: IncomingMessage, res: ServerResponse) {
    this.req = req;
    this.res = res;
    this.userController = new UserController(new UserService());
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

  public renderRoutes() {
    if (this.pathname.startsWith(PATHNAME.users)) {
      this.renderUserRouter();
    } else {
      this.res.writeHead(404, { "Content-Type": "application/json" });
      this.res.write(JSON.stringify({ message: "Not Found" }));
      this.res;
    }
  }
}
