import dotenv from 'dotenv' //dotenv sirve para leer las variables de entorno
import app from './app.js'
import mongoose from 'mongoose'
dotenv.config();
const port = 3500;
const url = process.env.MONGO_URI;

/*
import { MongoClient, ServerApiVersion } from 'mongodb';
const client = new MongoClient(url,  { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    client.close()
})
app.listen(port, () => {
    console.log(url)
    console.log(`Server running on https://localhost/${port}`)
})*/



mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://root:root@cluster0.mryyg.mongodb.net/administrador-de-pacientes')
  .then(() => {
      console.log('La conexion a MongoDb se ha realizado correctamente')
      console.log(process.env.MONGO_URI)

      app.listen(port, () => {
        console.log(`Server running on https://localhost/${port}`)
    })
  })
  .catch(err => console.log(err))