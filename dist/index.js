import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import connectDB from "./config/db.js";
import { initializeModels } from "./models/connections.js";
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(morgan("dev"));
// Rutas
app.use("/api/v1", authRoutes);
app.use("/api/v1", productRoutes);
app.use("/api/v1", orderRoutes);
// Inicializar conexiones a las bases de datos y modelos
connectDB()
    .then(() => {
    // Inicializar modelos después de que las conexiones estén listas
    initializeModels();
    console.log("✅ Modelos inicializados correctamente");
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en el puerto: ${PORT}`);
    });
})
    .catch((error) => {
    console.error("❌ Error al iniciar el servidor:", error);
    process.exit(1); // Termina el proceso si no se puede conectar a la base de datos
});
