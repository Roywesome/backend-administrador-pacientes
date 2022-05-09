import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.js";

const checkAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    //Verificar si tiene Bearer
  }

  try {
    token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET); //Boolean

    req.user = await UserModel.findById(decoded.id).select(
      "-password -confirm -token"
    );
    return next();
  } catch (error) {
    const err = new Error("Token no válido");
    res.status(403).json({ msg: err.message });
  }

  if (!token) {
    const err = new Error("Token no válido o inexistente");
    res.status(403).json({ msg: err.message });
  }

  next();
};

export default checkAuth;
