export class Variables {
  private PORT: number = parseInt(process.env.PORT || "3000");
  private HOST: string = process.env.HOST || "localhost";

  constructor() {}

  public getPort(): number {
    return this.PORT;
  }
  public getHost(): string {
    return this.HOST;
  }
}
