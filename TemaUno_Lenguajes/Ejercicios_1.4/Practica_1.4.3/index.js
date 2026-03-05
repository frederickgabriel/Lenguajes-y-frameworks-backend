//Por Frederick Gabriel Aguilar Puc

import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));


console.log(__dirname);

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/Public/index.html");
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  res.send("Datos recibidos");
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto ${port}`);
});