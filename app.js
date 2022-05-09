import express from "express";
const app = express();

//Cargar rutas
import userRoutes from "./routes/user.js";
import clienteRoutes from "./routes/cliente.js";

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Rutas
app.use("/api/users", userRoutes);
app.use("/api/clientes", clienteRoutes);

export default app;
