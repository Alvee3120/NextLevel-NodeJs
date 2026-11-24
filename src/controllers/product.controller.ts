import type { IncomingMessage, ServerResponse } from "http";
import { ProductService } from "../service/product.service";
import type { IProduct } from "../types/product";

const productController = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;
  const urlParams = url?.split("/");
  console.log(urlParams);
  const id =
    urlParams && urlParams[1] === "products" ? Number(urlParams[2]) : null;

  console.log(id);

  if (url === "/products" && method === "GET") {
    const products = ProductService();

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products Retrives Successfully",
        data: products,
      }),
    );
  } else if (method === "GET" && id !== null) {
    const products = ProductService();
    const product = products.find((p: IProduct) => p.id === id);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products Retrives Successfully",
        data: product,
      }),
    );
  }
};

export default productController;
