import express from 'express'

const app = express();

//Cargar rutas

//Middlewares
app.use( express.urlencoded({extended: false}))
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200);
    res.send({
        message: 'Server with express'
    })
})

export default app;