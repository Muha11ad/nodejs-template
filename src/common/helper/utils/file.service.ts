import { promises as fs } from "fs";
import { pathToUserJson } from "../consts/paths.js";

export class FileService {
  public async getAll(): Promise<any[]> {
    try {
      const data = await fs.readFile(pathToUserJson, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      throw new Error("Error reading file");
    }
  }

  public async create(newData: any): Promise<void> {
    try {
      const data = await this.getAll();
      data.push(newData);
      await fs.writeFile(pathToUserJson, JSON.stringify(data, null, 2));
    } catch (error) {
      throw new Error("Error writing file");
    }
  }

  public async update(id: string, updatedData: any): Promise<void> {
    try {
      const data = await this.getAll();
      const index = data.findIndex((item: any) => item.id === id);
      if (index === -1) throw new Error("Item not found");
      data[index] = { ...data[index], ...updatedData };
      await fs.writeFile(pathToUserJson, JSON.stringify(data, null, 2));
    } catch (error) {
      throw new Error("Error updating file");
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      const data = await this.getAll();
      const filteredData = data.filter((item: any) => item.id !== id);
      await fs.writeFile(pathToUserJson, JSON.stringify(filteredData, null, 2));
    } catch (error) {
      throw new Error("Error deleting file");
    }
  }
}
