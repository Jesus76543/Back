import express from "express";
import { getAllProducts, getProductById, saveProduct, updateProduct, deleteProduct, updateProductStock, } from "../controllers/product.controller.js";
const routes = express.Router();
// GET /api/v1/products - Obtener todos los productos
routes.get("/products", getAllProducts);
// GET /api/v1/products/:productId - Obtener producto por ID
routes.get("/products/:productId", getProductById);
// POST /api/v1/products - Crear nuevo producto
routes.post("/products", saveProduct);
// PUT /api/v1/products/:productId - Actualizar producto
routes.put("/products/:productId", updateProduct);
// DELETE /api/v1/products/:productId - Eliminar producto (soft delete)
routes.delete("/products/:productId", deleteProduct);
// PATCH /api/v1/products/:productId/stock - Actualizar stock del producto
routes.patch("/products/:productId/stock", updateProductStock);
export default routes;
