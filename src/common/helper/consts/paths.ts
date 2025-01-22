import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const pathToUserJson = join(__dirname, "../../../../data/user.json");
export const pathToVideo = join(__dirname, "../../../../data/uploads");
