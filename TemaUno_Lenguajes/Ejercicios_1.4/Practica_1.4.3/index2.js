//Por Frederick Gabriel Aguilar Puc

import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

import bodyParser from "body-parser";

const _dirname = dirname(fileURLToPath(import.meta.url));

console.log(_dirname);

const app = express();
const port = 3000;

var nombreEquipo = "";


function registrador(req, res, next) {

  console.log(req.body); 
  nombreEquipo = req.body["mascota"] + req.body["adjetivo"]; 
  next(); 
}
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.sendFile(_dirname + "/Public/index.html");
});

app.use(registrador);
app.post("/submit", (req, res) => {
  console.log(req.body);
  res.send("<h1>El nombre de tu equipo es: </h1>" + `<h2>${nombreEquipo}</h2>`);
});

app.listen(port, () => {
  console.log(`Servidor ejecutandose en el puerto ${port}`);
});