import { Schema } from "mongoose";
export const ProductoSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    Quantity: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    deleteAt: {
        type: Date,
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
