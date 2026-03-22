// por frederick gabriel
// importar dependencias
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

// obtener ruta actual
const _dirname = dirname(fileURLToPath(import.meta.url));

// Crear la instancia de express
const app = express();

// Configurar el puerto
const port = 3000;

const recetaJSON = `

[
    {
        "id": "0001",
        "tipo": "taco",
        "nombre": "Taco de cochinita pibil",
        "precio": 22.00,
        "ingredientes": {
            "proteina": {
                "nombre": "Cerdo",
                "preparacion": "Cochinita pibil"
            },
            "salsa": {
                "nombre": "Chile habanero",
                "picor": "Alto"
            },
            "acompañamientos": [
                {
                    "nombre": "Cebolla morada",
                    "cantidad": "1 cucharada",
                    "ingredientes": [
                        "Cebolla morada",
                        "Naranja agria",
                        "Sal"
                    ]
                },
                {
                    "nombre": "Frijol refrito",
                    "cantidad": "2 cucharadas",
                    "ingredientes": [
                        "Frijol",
                        "Manteca",
                        "Sal"
                    ]
                }
            ]
        }
    },
    {
        "id": "0002",
        "tipo": "taco",
        "nombre": "Taco de lechón",
        "precio": 20.00,
        "ingredientes": {
            "proteina": {
                "nombre": "Puerco",
                "preparacion": "Horneado"
            },
            "salsa": {
                "nombre": "Tomate verde",
                "picor": "Medio"
            },
            "acompañamientos": [
                {
                    "nombre": "Cebolla",
                    "cantidad": "1 cucharada",
                    "ingredientes": [
                        "Cebolla blanca",
                        "Cilantro",
                        "Naranja",
                        "Sal"
                    ]
                },
                {
                    "nombre": "Guacamole",
                    "cantidad": "2 cucharadas",
                    "ingredientes": [
                        "Aguacate",
                        "Jugo de limon",
                        "Sal",
                        "Cebolla",
                        "Cilantro"
                    ]
                }
            ]
        }
    },
    {
        "id": "0003",
        "tipo": "taco",
        "nombre": "Taco de relleno negro",
        "precio": 25.00,
        "ingredientes": {
            "proteina": {
                "nombre": "Pavo",
                "preparacion": "Relleno negro"
            },
            "salsa": {
                "nombre": "Recado negro",
                "picor": "Medio"
            },
            "acompañamientos": [
                {
                    "nombre": "Huevo cocido",
                    "cantidad": "1 pieza",
                    "ingredientes": [
                        "Huevo",
                        "Sal"
                    ]
                },
                {
                    "nombre": "Tortilla extra",
                    "cantidad": "1 pieza",
                    "ingredientes": [
                        "Maiz"
                    ]
                }
            ]
        }
    },
    {
        "id": "0004",
        "tipo": "taco",
        "nombre": "Taco de pescado tikin xic",
        "precio": 30.00,
        "ingredientes": {
            "proteina": {
                "nombre": "Pescado",
                "preparacion": "Tikin xic"
            },
            "salsa": {
                "nombre": "Chile habanero con limon",
                "picor": "Alto"
            },
            "acompañamientos": [
                {
                    "nombre": "Ensalada",
                    "cantidad": "1 porcion",
                    "ingredientes": [
                        "Lechuga",
                        "Jitomate",
                        "Pepino",
                        "Sal"
                    ]
                },
                {
                    "nombre": "Arroz",
                    "cantidad": "2 cucharadas",
                    "ingredientes": [
                        "Arroz",
                        "Ajo",
                        "Sal"
                    ]
                }
            ]
        }
    }
]
`;

const recetasTacos = JSON.parse(recetaJSON);

app.use(express.static("Public"));
app.use(bodyParser.json());

app.get("/receta/:type", (req, res) => {

    const tipo = req.params.type.toLowerCase();

    const taco = recetasTacos.find(r =>
        r.ingredientes.proteina.nombre.toLowerCase() === tipo
    );

    res.json(taco || { error: "Receta no encontrada" });
});


// iniciar servidor
app.listen(port, () => {
    console.log(`Servidor ejecutandose en el puerto ${port} `);
});