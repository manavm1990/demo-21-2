import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../config.js";
import { ThoughtSchema } from "../thought/index.js";
import { generateToken } from "../utils.js";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  //  ⚠️ This is an unbounded array! It should not be embedded like this. ⚠️
  thoughts: [ThoughtSchema],
});

UserSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, config.saltRounds);
  }

  next();
});

UserSchema.methods.authenticate = async function (password) {
  const isCorrectPassword = await bcrypt.compare(
    password,

    // 'this' references the document (user) that called this method
    this.password
  );

  if (!isCorrectPassword) {
    throw new Error("Incorrect password");
  }

  return generateToken(this.username);
};

export default model("User", UserSchema);
