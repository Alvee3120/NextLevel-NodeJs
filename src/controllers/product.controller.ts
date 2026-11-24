import type { IncomingMessage, ServerResponse } from "http";
import { ProductService } from "../service/product.service";

const productController = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;

  if (url === "/products" && method === "GET") {
    const products = [
      {
        id: 1,
        name: "product-1",
        price: 123,
      },
      {
        id: 2,
        name: "product-2",
        price: 233,
      },
      {
        id: 3,
        name: "product-3",
        price: 453,
      },
    ];
    ProductService();
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products Retrives Successfully",
        data: products,
      }),
    );
  }
};

export default productController;
