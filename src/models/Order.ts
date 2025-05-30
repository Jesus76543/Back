import { Document, Schema, Types } from "mongoose";

export interface Order extends Document {
  _id: Types.ObjectId;
  usuarioCreador: Types.ObjectId; // Usuario que la creó
  total: number;
  subtotal: number;
  deleteAt: Date;
  createdAt: Date;
  status: boolean;
}

export const OrdenSchema = new Schema<Order>({
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


