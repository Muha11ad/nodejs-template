import {
  responseOk,
  responseError,
} from "../../common/helper/utils/response.handler.js";
import { UserService } from "./user.service.js";
import { IncomingMessage, ServerResponse } from "http";
import { USER_ERROR_MESSAGES } from "../../common/helper/consts/userResponse.consts.js";
import { bodyParser } from "../../common/middleware/body-parser.middleware.js";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public async getAll(
    req: IncomingMessage,
    res: ServerResponse
  ): Promise<void> {
    try {
      const users = await this.userService.getAll();
      responseOk(res, 200, users);
    } catch (error: unknown) {
      responseError(res, 500, USER_ERROR_MESSAGES.GET_ALL, error);
    }
  }

  public async create(
    req: IncomingMessage,
    res: ServerResponse
  ): Promise<void> {
    try {
      const data = await bodyParser(req);
      const newUser = await this.userService.create(data);
      responseOk(res, 201, newUser);
    } catch (error: unknown) {
      responseError(res, 500, USER_ERROR_MESSAGES.CREATE, error);
    }
  }

  public async update(
    req: IncomingMessage,
    res: ServerResponse
  ): Promise<void> {
    try {
      const id = req.url?.split("/")[2];
      const data = await bodyParser(req);
      const updatedUser = await this.userService.update(Number(id), data);
      responseOk(res, 200, updatedUser);
    } catch (error: unknown) {
      responseError(res, 500, USER_ERROR_MESSAGES.UPDATE, error);
    }
  }

  public async delete(
    req: IncomingMessage,
    res: ServerResponse
  ): Promise<void> {
    try {
      const id = req.url?.split("/")[2];
      await this.userService.delete(Number(id));
      responseOk(res, 204, null);
    } catch (error: unknown) {
      responseError(res, 500, USER_ERROR_MESSAGES.DELETE, error);
    }
  }
}
