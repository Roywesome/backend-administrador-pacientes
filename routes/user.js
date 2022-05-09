import express from "express";
const api = express.Router();
import {
  profile,
  saveUser,
  confirmAccount,
  Auth,
  forgotPassword,
  compareToken,
  newPassword,
} from "../controllers/user.js";
import checkAuth from "../middlewares/Auth.js";

//Public
api.post("/", saveUser);
api.get("/confirm-account/:token", confirmAccount);
api.post("/login", Auth);
api.post("/forgot-password", forgotPassword); //Validar el email del usuario
/*
api.get('/fotgot-password/:token', compareToken) //Leer el token y comprobar
api.post('/fotgot-password/:token', newPassword) //Para almacenar el token
*/

api.route("/forgot-password/:token").get(compareToken).post(newPassword);

//Private
api.get("/profile", checkAuth, profile);

export default api;
