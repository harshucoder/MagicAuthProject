import { Schema, model, models } from 'mongoose';
//removed
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
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
    }]
  },
  {
    timestamps: true
  }
);

const User = models.User || model('User', userSchema);
export default User;