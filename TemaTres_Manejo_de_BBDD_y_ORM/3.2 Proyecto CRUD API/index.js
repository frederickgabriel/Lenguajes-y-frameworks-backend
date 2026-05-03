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

// POST - Crear usuario
app.post('/usuarios', async (req, res) => {
    try {
        const usuario = await Usuario.create(req.body);
        res.status(201).json(usuario);
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
});

// GET - Obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
});

// GET - Obtener usuario por ID
app.get('/usuario/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
});

// PUT - Actualizar usuario
app.put('/usuario/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByIdAndUpdate(id, req.body);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        const usuarioActualizado = await Usuario.findById(id);
        res.status(200).json(usuarioActualizado);
        console.log(usuarioActualizado);
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
});

// DELETE - Eliminar usuario
app.delete('/usuario/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByIdAndDelete(id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
});

app.listen(puerto, () => {
    console.log(`Servidor escuchando en http://localhost:${puerto}`);
});