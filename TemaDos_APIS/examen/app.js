// https://open-meteo.com/
import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const result = await axios.get(
            "https://api.open-meteo.com/v1/forecast?latitude=19.580562606414606&longitude=-88.04456563719913&current=temperature_2m,wind_speed_10m,relative_humidity_2m,is_day"
        ); 

        const temp = result.data.current.temperature_2m;
        const wind = result.data.current.wind_speed_10m;
        const humidity = result.data.current.relative_humidity_2m;
        const isDay = result.data.current.is_day;

        res.render("index", {
            temp,
            wind,
            humidity,
            isDay
        });

    } catch (error) {
        console.log(error.message);
        res.send("Error al obtener el clima");
    }
});

app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});