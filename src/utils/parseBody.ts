import type { IncomingMessage } from "http";

export const BodyParser = (req: IncomingMessage): Promise<any> => {
  let body = "";
  return new Promise((reslove, reject) => {
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        reslove(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
  });
};
