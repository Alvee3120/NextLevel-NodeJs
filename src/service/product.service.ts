import path from "node:path";

const filePath = path.join(process.cwd(), "./src/db/db.json");

export const ProductService = () => {
  console.log(filePath);
};
