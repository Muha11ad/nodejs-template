import { File } from "buffer";
import { IncomingMessage } from "http";

export interface CustomRequest extends IncomingMessage {
  file: File;
}
