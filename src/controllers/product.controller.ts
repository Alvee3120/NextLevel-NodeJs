import type { IncomingMessage, ServerResponse } from "http";
import { createProduct, ProductService } from "../service/product.service";
import type { IProduct } from "../types/product";
import { BodyParser } from "../utils/parseBody";

const productController = async (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;
  const urlParams = url?.split("/");
  console.log(urlParams);
  const id =
    urlParams && urlParams[1] === "products" ? Number(urlParams[2]) : null;

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
  } else if (method === "POST" && url === "/products") {
    const body = await BodyParser(req);
    console.log(body);

    const newProduct = {
      id: Date.now(),
      ...body,
    };

    console.log(newProduct);

    const products = ProductService();
    products.push(newProduct);

    createProduct(products);

    res.writeHead(201, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products Retrives Successfully",
        data: newProduct,
      }),
    );
  } else if (method === "PUT" && id !== null) {
    const body = await BodyParser(req);
    const products = ProductService();

    const index = products.findIndex((p: IProduct) => p.id === id);
    console.log(index);

    if (index < 0) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product Not Found !",
        }),
      );
    }
    products[index] = { id: products[index].id, ...body };
    createProduct(products);
    res.writeHead(201, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products Updated Successfully",
      }),
    );
  } else if (method === "DELETE" && id !== null) {
    const products = ProductService();

    const index = products.findIndex((p: IProduct) => p.id === id);
    console.log(index);

    if (index < 0) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product Not Found !",
        }),
      );
    }

    products.splice(index, 1);
    createProduct(products);
    res.writeHead(201, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products Deleted Successfully",
      }),
    );
  }
};

export default productController;
