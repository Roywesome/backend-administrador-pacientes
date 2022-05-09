import express from "express";
const api = express.Router();
import checkAuth from "../middlewares/Auth.js";

import {
  addClientes,
  getClientes,
  getCliente,
  updateCliente,
  deleteCliente,
} from "../controllers/cliente.js";

api.route("/").post(checkAuth, addClientes).get(getClientes);

api
  .route("/:id")
  .get(checkAuth, getCliente)
  .put(checkAuth, updateCliente)
  .delete(checkAuth, deleteCliente);

export default api;
