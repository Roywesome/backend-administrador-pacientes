import { UserModel } from "../models/user.js";
import generateJWT from "../helpers/generateJWT.js";
import generateId from "../helpers/generateId.js";

const confirmAccount = async (req, res) => {
  const { token } = req.params; //Para leer datos de la URl
  const userConfirm = await UserModel.findOne({ token: token });
  console.log(userConfirm);

  if (!userConfirm) {
    const error = new Error("Token no válido.");
    return res.status(404).json({ msg: error.message });
  }

  try {
    userConfirm.token = null;
    userConfirm.confirm = true;
    await userConfirm.save();
    res.json({ msg: "Usuario confirmado correctamente" });
  } catch (err) {
    console.log(err);
  }
};

const saveUser = async (req, res) => {
  const params = req.body; //Para leer datos del formulario
  const { email } = params;

  //Prevenir usuarios duplicados
  const existeUser = await UserModel.findOne({ email: email });

  if (existeUser) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    //Guardar el usuario
    const params = req.body;
    const user = new UserModel(params);
    const userSaved = await user.save();

    res.json(userSaved);
  } catch (error) {
    console.log(error);
  }
};

const Auth = async (req, res) => {
  //Comprobamos si el usuario existe
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    const error = new Error("No existe el usuario");
    return res.status(403).json({ msg: error.message });
  }

  //Comprobar si el usuario esta confirmado
  if (!user.confirm) {
    const error = new Error("Tu cuenta no ha sido verificado");
    return res.status(403).json({ msg: error.message });
  }

  //Revisar el password esta correcto
  if (await user.checkPassword(password)) {
    //Autenticar
    res.json({ token: generateJWT(user.id) });
  } else {
    const error = new Error("La contraseña es incorrecta.");
    return res.status(403).json({ msg: error.message });
  }

  try {
  } catch (error) {
    console.log(error);
  }
};

const profile = (req, res) => {
  const { user } = req;
  res.json({ perfil: user });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const existeUser = await UserModel.findOne({ email });

  if (!existeUser) {
    const error = new Error("El usuario no existe!");
    return res.status(400).json({ msg: error.message });
  }

  try {
    existeUser.token = generateId();
    await existeUser.save();
    res.json({ msg: "Hemos enviado un email con las intrucciones" });
  } catch (err) {
    console.log(err);
  }
};

const compareToken = async (req, res) => {
  const { token } = req.params;

  const tokenValid = await UserModel.findOne({ token });

  if (tokenValid) {
    res.json({ msg: "Token válido y el usuario existe." });
  } else {
    const error = new Error("Token no válido");
    return res.status(400).json({ msg: error.message });
  }
};

const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await UserModel.findOne({ token });

  if (!user) {
    const error = new Error("Hubo un error");
    return res.status(400).json({ msg: error.message });
  }

  try {
    //El token es de un solo uso.
    user.token = null;
    user.password = password;
    await user.save();
    res.json({ msg: "Password modificado" });
  } catch (error) {
    console.log(error);
  }
};

export {
  profile,
  saveUser,
  confirmAccount,
  Auth,
  forgotPassword,
  compareToken,
  newPassword,
};
