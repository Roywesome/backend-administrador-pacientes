import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema, model } = mongoose;
import generateId from "../helpers/generateId.js";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true, //Elimina vacios
  },
  email: {
    type: String,
    required: true,
    unique: true, //Garantizamos el uso de email por cuenta
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    default: null,
    trim: true,
  },
  web: {
    type: String,
    default: null,
  },
  token: {
    type: String,
    default: generateId(),
  },
  confirm: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    //Si es password esta hasheado no vuelve a hashearlo
    next(); //Next() --> Sirve para que termine y pase al siguiente
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

///Autenticar al usuario

userSchema.methods.checkPassword = async function (passForm) {
  return await bcrypt.compare(passForm, this.password);
};

const UserModel = model("User", userSchema);

export { UserModel };
