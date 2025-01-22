import { promises as fs } from "fs";
import { pathToUserJson } from "../../common/helper/consts/paths.js";
import { IUserInputDTO, IUserUpdateDTO } from "./user.model.js";
import { USER_ERROR_MESSAGES } from "@/common/helper/consts/userResponse.consts.js";

export class UserService {
  private getRandomId(): number {
    return Math.floor(10000 + Math.random() * 90000);
  }

  public async getAll(): Promise<any> {
    try {
      const data = await fs.readFile(pathToUserJson, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      throw new Error("Error reading file");
    }
  }

  public async create(data: IUserInputDTO): Promise<IUserInputDTO> {
    try {
      const users = await this.getAll();
      const newUser = {
        id: this.getRandomId(),
        name: data.name,
        email: data.email,
        password: data.password,
      };
      users.push(newUser);
      await fs.writeFile(pathToUserJson, JSON.stringify(users, null, 2));
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Unknown error");
      }
    }
  }

  public async update(
    id: number,
    data: IUserUpdateDTO
  ): Promise<IUserUpdateDTO> {
    try {
      const users = await this.getAll();
      const index = users.findIndex((user: any) => user.id === id);
      if (index !== -1) {
        users[index] = { ...users[index], ...data };
        await fs.writeFile(pathToUserJson, JSON.stringify(users, null, 2));
        return data;
      }
      throw new Error("User not found");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Unknown error");
      }
    }
  }

  public async delete(id: number): Promise<string> {
    try {
      const users = await this.getAll();
      const index = users.findIndex((user: any) => user.id === id);
      if (index !== -1) {
        users.splice(index, 1);
        await fs.writeFile(pathToUserJson, JSON.stringify(users, null, 2));
        return "User deleted";
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Unknown error");
      }
    }
  }
}
