import * as url from "url";
import * as dotenv from "dotenv";
import { createServer } from "node:http";
import { Variables } from "./configs";

dotenv.config();

function server() {
  return createServer((req, res) => {
    const urlParse = url.parse(req.url || "", true);
    if (urlParse.pathname == "/user" && req.method == "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ name: "John Doe" }));
      return res.end();
    }
  });
}

const { getHost, getPort } = new Variables();

server().listen(getPort(), getHost(), () => {
  console.log("Server is running on http://localhost:3000");
});
