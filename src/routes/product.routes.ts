import express, { RequestHandler } from "express";
import {
  getAllProducts,
  getProductById,
  saveProduct,
  updateProduct,
  deleteProduct,
  updateProductStock,
} from "../controllers/product.controller.js";

const routes = express.Router();

// GET /api/v1/products - Obtener todos los productos
routes.get("/products", getAllProducts as RequestHandler);

// GET /api/v1/products/:productId - Obtener producto por ID
routes.get("/products/:productId", getProductById as RequestHandler);

// POST /api/v1/products - Crear nuevo producto
routes.post("/products", saveProduct as RequestHandler);

// PUT /api/v1/products/:productId - Actualizar producto
routes.put("/products/:productId", updateProduct as RequestHandler);

// DELETE /api/v1/products/:productId - Eliminar producto (soft delete)
routes.delete("/products/:productId", deleteProduct as RequestHandler);

// PATCH /api/v1/products/:productId/stock - Actualizar stock del producto
routes.patch(
  "/products/:productId/stock",
  updateProductStock as RequestHandler
);

export default routes;
