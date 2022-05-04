import dotenv from 'dotenv' //dotenv sirve para leer las variables de entorno
import app from './app.js'
import mongoose from 'mongoose'
dotenv.config();
const port = 3500;
const uri = process.env.MONGO_URI;

mongoose.Promise = global.Promise;
mongoose.connect(uri)
  .then(() => {
      console.log('La conexion a MongoDb se ha realizado correctamente')
      console.log(process.env.MONGO_URI)

      app.listen(port, () => {
        console.log(`Server running on https://localhost/${port}`)
    })
  })
  .catch(err => console.log(err))