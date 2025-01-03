import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            { _id: this._id, email: this.email },
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        )
    } catch (error) {
        console.log(error)
    }
}

const User = mongoose.model("User", userSchema);
export default User;