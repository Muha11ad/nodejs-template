import * as dotenv from "dotenv";
dotenv.config();

import { Router } from "./routes.js";
import { createServer, IncomingMessage, ServerResponse } from "node:http";

function server() {
  return createServer((req: IncomingMessage, res: ServerResponse) => {
    const router = new Router(req, res);
    router.renderRoutes();
  });
}

function getPort(): number {
  return parseInt(process.env.PORT || "3000");
}

function getHost(): string {
  return process.env.HOST || "localhost";
}

server().listen(getPort(), getHost(), () => {
  console.log(`Server is running on http://${getHost()}:${getPort()}`);
});
