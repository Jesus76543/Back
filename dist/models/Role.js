import { Schema } from "mongoose";
export const RolSchema = new Schema({
    type: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    deleteAt: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: Boolean,
        default: true,
    },
});
// Exportar schema para usar en connections.ts
// El modelo se creará en connections.ts con la conexión específica
