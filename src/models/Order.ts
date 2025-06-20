import { Document, Schema, Types } from "mongoose";

interface IOrderProduct {
  productId: Types.ObjectId; // Referencia al producto
  quantity: number; // Cantidad del producto
  price: number; // Precio del producto al momento de la compra
}

export interface Order extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  total: number;
  subtotal: number;
  status: boolean;
  deleteAt?: Date;
  createdAt: Date;
  products: IOrderProduct[];
}

export const orderProductSchema = new Schema<IOrderProduct>(
  {
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
  },
  { _id: false }
);

export const OrdenSchema = new Schema<Order>({
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
      (array: string | any[]) => array.length > 0,
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
