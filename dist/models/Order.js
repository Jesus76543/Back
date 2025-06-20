import { Schema } from "mongoose";
export const orderProductSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Producto",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
}, { _id: false });
export const OrdenSchema = new Schema({
    userId: {
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
    products: {
        type: [orderProductSchema],
        required: true,
        validate: [
            (array) => array.length > 0,
            "El pedido debe contener al menos un producto.",
        ],
    },
    status: {
        type: Boolean,
        default: true,
    },
    deleteAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
