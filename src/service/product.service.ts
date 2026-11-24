import fs from "fs";
import path from "node:path";

const filePath = path.join(process.cwd(), "./src/db/db.json");

export const ProductService = () => {
  //   console.log(filePath);
  const result = fs.readFileSync(filePath, "utf-8");
  console.log(result);

  return JSON.parse(result);
};
