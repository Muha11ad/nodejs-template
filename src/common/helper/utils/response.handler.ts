import { ServerResponse } from "http";

export function responseError(
  res: ServerResponse,
  statusCode: number = 500,
  message: string = "Internal Server Error",
  error: any = null
) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      message,
      error: error ? error.toString() : undefined,
    })
  );
}

export function responseOk(
  res: ServerResponse,
  statusCode: number = 200,
  data: any = {}
) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data,
    })
  );
}
