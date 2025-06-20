import express from "express";
import { getAllOrders, getOrderById, createOrder, updateOrderStatus, cancelOrder, getOrdersByUserId, } from "../controllers/order.controller.js";
const routes = express.Router();
// GET /api/v1/orders - Obtener todas las órdenes
routes.get("/orders", getAllOrders);
// GET /api/v1/orders/:orderId - Obtener orden por ID
routes.get("/orders/:orderId", getOrderById);
// POST /api/v1/orders - Crear nueva orden
routes.post("/orders", createOrder);
// PATCH /api/v1/orders/:orderId/status - Actualizar estado de orden
routes.patch("/orders/:orderId/status", updateOrderStatus);
// DELETE /api/v1/orders/:orderId - Cancelar orden
routes.delete("/orders/:orderId", cancelOrder);
// GET /api/v1/users/:userId/orders - Obtener órdenes de un usuario específico
routes.get("/users/:userId/orders", getOrdersByUserId);
export default routes;
