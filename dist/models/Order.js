import { Schema } from "mongoose";
export const OrdenSchema = new Schema({
    usuarioCreador: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    total: {
        type: Number,
        required: true,
        min: 0,
    },
    subtotal: {
        type: Number,
        required: true,
        min: 0,
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
