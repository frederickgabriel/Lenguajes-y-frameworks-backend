import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const result = await axios.get("https://api.animechan.io/v1/quotes/random");

        console.log(result.data); 

        const quote = result.data.data.content;
        const character = result.data.data.character.name;

        res.render("index", { quote, character });

    } catch (error) {
        console.log("ERROR:");
        console.log(error.response?.data || error.message);
        res.status(500).send("Error al obtener la cita");
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});