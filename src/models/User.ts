import { Document, Schema } from "mongoose";
import { Types } from "mongoose";

export interface IUser extends Document {
  nombre: string;
  email: string; //sera el usuario
  password: string;
  role: string;
  _id: Types.ObjectId;
  phone: string;
  createdAt: Date;
  deleteAt: Date;
  status: boolean;
}

export const UserSchema = new Schema<IUser>({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  role: { type: String },
  phone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  deleteAt: { type: Date, default: Date.now },
  status: { type: Boolean },
});

// Exportar schema para usar en connections.ts
// El modelo se creará en connections.ts con la conexión específica
