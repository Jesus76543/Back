import express, { RequestHandler } from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  cancelOrder,
  getOrdersByUserId,
} from "../controllers/order.controller.js";

const routes = express.Router();

// GET /api/v1/orders - Obtener todas las órdenes
routes.get("/orders", getAllOrders as RequestHandler);

// GET /api/v1/orders/:orderId - Obtener orden por ID
routes.get("/orders/:orderId", getOrderById as RequestHandler);

// POST /api/v1/orders - Crear nueva orden
routes.post("/orders", createOrder as RequestHandler);

// PATCH /api/v1/orders/:orderId/status - Actualizar estado de orden
routes.patch("/orders/:orderId/status", updateOrderStatus as RequestHandler);

// DELETE /api/v1/orders/:orderId - Cancelar orden
routes.delete("/orders/:orderId", cancelOrder as RequestHandler);

// GET /api/v1/users/:userId/orders - Obtener órdenes de un usuario específico
routes.get("/users/:userId/orders", getOrdersByUserId as RequestHandler);

export default routes;
