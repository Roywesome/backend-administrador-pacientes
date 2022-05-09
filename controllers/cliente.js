import { ClienteModel } from "../models/cliente.js";

const addClientes = async (req, res) => {
  const cliente = new ClienteModel(req.body);
  cliente.user = req.user._id;

  try {
    const clienteSaved = await cliente.save();
    res.json(clienteSaved);
  } catch (error) {
    console.log(error);
  }
};

const getClientes = async (req, res) => {
  const clientes = await ClienteModel.find();

  res.json(clientes);
};

const getCliente = async (req, res) => {
    const {id} = req.params;
    const cliente = await ClienteModel.findById(id);

    if(!cliente) {
        return res.status(400).json({msg: "No encontrado"})
    }

    /*if(cliente.user._id !== req.user.id){ //Comparar 2 objetos con el mismo valor es false
        return res.json({msg: "Acción no válida"})
    }*/

    if(cliente.user._id.toString() !== req.user.id.toString()){
        return res.json({msg: "Acción no válida"})
    }

    res.json(cliente);
}

const updateCliente = async (req, res) => {
    const {id} = req.params;
    const cliente = await ClienteModel.findById(id);

    if(!cliente) {
        return res.status(400).json({msg: "No encontrado"})
    }

    if(cliente.user._id.toString() !== req.user.id.toString()){
        return res.json({msg: "Acción no válida"})
    }

   //Actualizar cliente
   const {name, propietario, email, date, sintomas} = req.body;
   cliente.name = name || cliente.name;
   cliente.propietario = propietario || cliente.propietario;
   cliente.email = email || cliente.email;
   cliente.date = date || cliente.date;
   cliente.sintomas = sintomas || cliente.sintomas;

   try{
       const clienteUpdate = await cliente.save();
       res.json(clienteUpdate)
   }catch(error){
       console.log(error)
   }
}

const deleteCliente = async (req, res) => {
    const {id} = req.params;
    const cliente = await ClienteModel.findById(id);

    if(!cliente) {
        return res.status(400).json({msg: "No encontrado"})
    }

    if(cliente.user._id.toString() !== req.user.id.toString()){
        return res.json({msg: "Acción no válida"})
    }

    try{
        await cliente.deleteOne(); //findOneAndDelete()
        res.json({msg: "Paciente eliminado."})

    }catch(error){
        console.log(error)
    }

}

export { addClientes, getClientes, getCliente, updateCliente, deleteCliente};
