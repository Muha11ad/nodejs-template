export class Variables {
    constructor() {
        this.PORT = parseInt(process.env.PORT || "3000");
        this.HOST = process.env.HOST || "localhost";
    }
    getPort() {
        return this.PORT;
    }
    getHost() {
        return this.HOST;
    }
}
