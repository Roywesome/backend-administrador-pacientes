import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ClienteSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    propietario: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    date: { type: Date, default: Date.now(), required: true },
    sintomas: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //Para traer informacion
    },
  },
  {
    timestamps: true,
  }
);

const ClienteModel = model("Cliente", ClienteSchema);

export { ClienteModel };
