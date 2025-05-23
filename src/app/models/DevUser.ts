import { Schema, model, models } from "mongoose";

const devUserSchema = new Schema(
  {
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      trim: true 
    },
    password: { type: String, required: true },
    apiKey: { type: String, required: true },
    smtp: {
      host: String,
      port: Number,
      user: String,
      pass: String,
    },
    tokens: [{
      token: {
        type: String,
        required: true,
      },
      expiresAt: {
        type: Date,
        required: true,
      }
    }],
    dbUri: { type: String }, // optional: their own DB
  },
  { timestamps: true }
);

const DevUser = models.DevUser || model("DevUser", devUserSchema);
export default DevUser;