import fs from "fs";
import type { IPVersion } from "net";
import path from "node:path";
import type { IProduct } from "../types/product";

const filePath = path.join(process.cwd(), "./src/db/db.json");

export const ProductService = () => {
  //   console.log(filePath);
  const result = fs.readFileSync(filePath, "utf-8");
  console.log(result);

  return JSON.parse(result);
};

export const createProduct = (payload: IProduct[]) => {
  fs.writeFileSync(filePath, JSON.stringify(payload));
};
