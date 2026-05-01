// import express from 'express';

// const app = express();
// const port = 3000;

// app.get('/',(req, res) => {
//     res.send ("Bienvenido a mi CRUD");

// });

// app.listen(port,() => {
//     console.log(`Servidor corriendo en el puerto http://localhost:${port}`);
// });

// // gabriel 2004
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Usuario from './models/usuario.model.js';

dotenv.config();

const app = express();
const puerto = 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Conexión MongoDB
const uri = process.env.uri;

mongoose.connect(uri)
    .then(() => console.log("Conexión exitosa a la base de datos"))
    .catch((error) => console.error("Error al conectar:", error));

// Rutas
app.get('/', (req, res) => {
    res.send('Bienvenido a mi API CRUD');
});

app.post('/usuarios', async (req, res) => {
    try {
        const usuario = await Usuario.create(req.body);
        res.status(201).json(usuario);
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
});

app.listen(puerto, () => {
    console.log(`Servidor escuchando en http://localhost:${puerto}`);
});