import mongoose from "mongoose";
// Configuración de las bases de datos
const dbConfigs = {
    user: {
        uri: "mongodb://localhost:27017/user",
        name: "user",
    },
    ordenes: {
        uri: "mongodb://localhost:27017/ordenes",
        name: "ordenes",
    },
    roles: {
        uri: "mongodb://localhost:27017/roles",
        name: "roles",
    },
    productos: {
        uri: "mongodb://localhost:27017/productos",
        name: "productos",
    },
};
// Variable para almacenar las conexiones
let connections;
const connectDB = async () => {
    try {
        // Crear conexiones a cada base de datos
        const userDB = await mongoose.createConnection(dbConfigs.user.uri);
        const ordenesDB = await mongoose.createConnection(dbConfigs.ordenes.uri);
        const rolesDB = await mongoose.createConnection(dbConfigs.roles.uri);
        const productosDB = await mongoose.createConnection(dbConfigs.productos.uri);
        // Almacenar las conexiones
        connections = {
            userDB,
            ordenesDB,
            rolesDB,
            productosDB,
        };
        console.log("✅ Conectado a todas las bases de datos:");
        console.log(`  - ${dbConfigs.user.name}: ${dbConfigs.user.uri}`);
        console.log(`  - ${dbConfigs.ordenes.name}: ${dbConfigs.ordenes.uri}`);
        console.log(`  - ${dbConfigs.roles.name}: ${dbConfigs.roles.uri}`);
        console.log(`  - ${dbConfigs.productos.name}: ${dbConfigs.productos.uri}`);
        return connections;
    }
    catch (error) {
        console.error("❌ Error al conectar a las bases de datos:", error);
        process.exit(1); // Termina el proceso si no se puede conectar
    }
};
// Función para obtener las conexiones (útil para usar en otros archivos)
export const getConnections = () => {
    if (!connections) {
        throw new Error("Las bases de datos no han sido inicializadas. Llama a connectDB() primero.");
    }
    return connections;
};
export default connectDB;
