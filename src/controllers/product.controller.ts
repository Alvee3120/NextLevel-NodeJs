import type { IncomingMessage, ServerResponse } from "http";
import { createProduct, ProductService } from "../service/product.service";
import type { IProduct } from "../types/product";
import { BodyParser } from "../utils/parseBody";
import { sendResponse } from "../utils/sendResponse";

const productController = async (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;
  const urlParams = url?.split("/");
  console.log(urlParams);
  const id =
    urlParams && urlParams[1] === "products" ? Number(urlParams[2]) : null;

  if (url === "/products" && method === "GET") {
    try {
      const products = ProductService();
      sendResponse(res, true, 200, "Products Retrives Successfully", products);
    } catch (error) {
      sendResponse(res, false, 500, "Internal server error");
    }
  } else if (method === "GET" && id !== null) {
    const products = ProductService();
    const product = products.find((p: IProduct) => p.id === id);
    if (!product) {
      sendResponse(res, false, 404, "Product not found");
      return;
    }
    sendResponse(res, true, 200, "Products Retrives Successfully", product);
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

    sendResponse(res, true, 201, "Products Retrives Successfully", newProduct);
  } else if (method === "PUT" && id !== null) {
    const body = await BodyParser(req);
    const products = ProductService();

    const index = products.findIndex((p: IProduct) => p.id === id);
    console.log(index);

    if (index < 0) {
      sendResponse(res, false, 404, "Products not found");
      return;
    }
    products[index] = { id: products[index].id, ...body };
    createProduct(products);
    sendResponse(res, true, 201, "Products Update Successfully");
  } else if (method === "DELETE" && id !== null) {
    const products = ProductService();

    const index = products.findIndex((p: IProduct) => p.id === id);
    console.log(index);

    if (index < 0) {
      sendResponse(res, false, 404, "Products Not found");
      return;
    }

    products.splice(index, 1);
    createProduct(products);
    sendResponse(res, true, 201, "Products Deleted Successfully");
  }
};

export default productController;
