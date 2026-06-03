import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';

dotenv.config();

const puerto = 3000;

// Conexión MongoDB
const uri = process.env.uri;

mongoose.connect(uri)
    .then(() => console.log("Conexión exitosa a la base de datos"))
    .catch((error) => console.error("Error al conectar:", error));

app.listen(puerto, () => {
    console.log(`Servidor escuchando en http://localhost:${puerto}`);
});