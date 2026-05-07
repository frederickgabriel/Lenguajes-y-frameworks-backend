// POR FREDERICK GABRIEL AGUILAR PUC
import express from 'express';
import dotenv from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';

dotenv.config();

const app = express();
const puerto = 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Conexión MongoDB con driver oficial
const uri = process.env.uri;
const client = new MongoClient(uri);

let db;
let usuariosCollection;

async function conectarDB() {
    try {
        await client.connect();
        db = client.db('test'); // nombre de la base de datos
        usuariosCollection = db.collection('usuarios');
        console.log("Conexión exitosa a la base de datos");
    } catch (error) {
        console.error("Error al conectar:", error);
        process.exit(1);
    }
}

conectarDB();

// Rutas
app.get('/', (req, res) => {
    res.send('Bienvenido a mi API CRUD');
});

// POST - Crear usuario
app.post('/usuarios', async (req, res) => {
    try {
        const { nombre, correo, edad } = req.body;

        // Validación básica 
        if (!nombre || !correo || !edad) {
            return res.status(400).json({ error: 'Faltan campos requeridos: nombre, correo, edad' });
        }

        const nuevoUsuario = {
            nombre,
            correo,
            edad: Number(edad),
            creadoEn: new Date()
        };

        const resultado = await usuariosCollection.insertOne(nuevoUsuario);

        // Devolvemos el documento insertado con su _id generado
        const usuarioInsertado = await usuariosCollection.findOne({ _id: resultado.insertedId });
        res.status(201).json(usuarioInsertado);
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
});

// GET - Obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await usuariosCollection.find().toArray();
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

        // ObjectId valida que el id tenga el formato correcto de MongoDB
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'ID no válido' });
        }

        const usuario = await usuariosCollection.findOne({ _id: new ObjectId(id) });
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

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'ID no válido' });
        }

        const { nombre, correo, edad } = req.body;

        // $set actualiza solo los campos enviados, sin sobreescribir el documento completo
        const camposActualizar = {};
        if (nombre !== undefined) camposActualizar.nombre = nombre;
        if (correo !== undefined) camposActualizar.correo = correo;
        if (edad !== undefined) camposActualizar.edad = Number(edad);

        const resultado = await usuariosCollection.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: camposActualizar },
            { returnDocument: 'after' } // devuelve el documento ya actualizado
        );

        if (!resultado) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        console.log(resultado);
        res.status(200).json(resultado);
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
});

// DELETE - Eliminar usuario
app.delete('/usuario/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'ID no válido' });
        }

        const resultado = await usuariosCollection.findOneAndDelete({ _id: new ObjectId(id) });
        if (!resultado) {
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