import { promises as fs } from "fs";
import { pathToUserJson } from "../../common/helper/consts/pathToUserJson.js";

export class UserService {
  public async getAll(): Promise<any> {
    try {
      const data = await fs.readFile(pathToUserJson, "utf-8");
      console.log(pathToUserJson);
      console.log(data);

      return JSON.parse(data);
    } catch (error) {
      console.log(error);

      throw new Error("Error reading file");
    }
  }

  public async create(data: any): Promise<any> {
    try {
      const users = await this.getAll();
      users.push(data);
      await fs.writeFile(pathToUserJson, JSON.stringify(users, null, 2));
      return data;
    } catch (error) {
      throw new Error("Error creating user");
    }
  }

  public async update(id: number, data: any): Promise<any> {
    try {
      const users = await this.getAll();
      const index = users.findIndex((user: any) => user.id === id);
      if (index !== -1) {
        users[index] = { ...users[index], ...data };
        await fs.writeFile(pathToUserJson, JSON.stringify(users, null, 2));
        return users[index];
      }
      throw new Error("User not found");
    } catch (error) {
      throw new Error("Error updating user");
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      const users = await this.getAll();
      const index = users.findIndex((user: any) => user.id === id);
      if (index !== -1) {
        users.splice(index, 1);
        await fs.writeFile(pathToUserJson, JSON.stringify(users, null, 2));
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      throw new Error("Error deleting user");
    }
  }
}
