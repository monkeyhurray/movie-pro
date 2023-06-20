import bcrypt from "bcrypt";
import mongoose, { Document } from "mongoose";

export interface DBUser extends Document {
  id: string;
  email: string;
  name: string;
  userName: string;
  password: string;
}

const userSchema = new mongoose.Schema<DBUser>({
  id: { type: String, required: true, trim: true, unique: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const User = mongoose.model<DBUser>("User", userSchema);
export default User;
