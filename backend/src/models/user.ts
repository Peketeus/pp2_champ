import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  nickname: string;
  passwordHash: string;
  shouldChangePass?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, minlength: 3 },
    nickname: { type: String },
    passwordHash: { type: String, required: true },
    shouldChangePass: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const UserModel = model<IUser>("User", UserSchema);
export default UserModel;
