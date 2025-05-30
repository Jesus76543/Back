import { Document, Schema, Types } from "mongoose";

export interface Role extends Document {
  _id: Types.ObjectId;
  type: string;
  deleteAt: Date;
  createdAt: Date;
  status: boolean;
}

export const RolSchema = new Schema<Role>({
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
