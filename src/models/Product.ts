import { Document, Schema, Types } from "mongoose";

export interface Product extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  Quantity: number;
  price: number;
  deleteAt?: Date;
  createdAt: Date;
  status: boolean;
}

export const ProductoSchema = new Schema<Product>({
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
