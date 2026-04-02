
// POR FREDERICK GABRIEL AGUILAR PUC

import axios from "axios";

const obtenerClima = async () => {
    try {
        const respuesta = await axios.get(
            "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=52b221f45a6ecc7ca5f1e0f03f5541c8"
        );

        console.log("Clima:", respuesta.data);

    } catch (error) {
        console.error("Error:", error.response.data);
    }
};

obtenerClima();

