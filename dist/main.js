import * as dotenv from "dotenv";
import { createServer } from "node:http";
import { Variables } from "./configs";
dotenv.config();
function server() {
    return createServer((req, res) => {
        console.log(req);
        res.end("Hello World");
    });
}
const { getHost, getPort } = new Variables();
server().listen(getPort(), getHost(), () => {
    console.log("Server is running on http://localhost:3000");
});
