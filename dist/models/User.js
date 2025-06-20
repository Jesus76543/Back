import { Schema } from "mongoose";
export const UserSchema = new Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    roles: { type: [String], required: true, default: ['user'] },
    phone: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    deleteAt: { type: Date },
    status: { type: Boolean, default: true },
});
// Exportar schema para usar en connections.ts
// El modelo se creará en connections.ts con la conexión específica
