// POR FREDERICK GABRIEL AGUILAR PUC 
// Obtener token de autenticación
// import axios from "axios";

// const login = async () => {
//     try {
//         const respuesta = await axios.post(
//             "https://dummyjson.com/auth/login",
//             {
//                 username: "emilys",
//                 password: "emilyspass"
//             }
//         );

//         console.log("Token:", respuesta.data.accessToken);

//     } catch (error) {
//         console.error("Error:", error.response?.data || error.message);
//     }
// };

// login();






// aplicar toke valido
import axios from "axios";

const obtenerUsuario = async () => {
    try {
        const respuesta = await axios.get(
            "https://dummyjson.com/auth/me",
            {
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlbWlseXMiLCJlbWFpbCI6ImVtaWx5LmpvaG5zb25AeC5kdW1teWpzb24uY29tIiwiZmlyc3ROYW1lIjoiRW1pbHkiLCJsYXN0TmFtZSI6IkpvaG5zb24iLCJnZW5kZXIiOiJmZW1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL2VtaWx5cy8xMjgiLCJpYXQiOjE3NzUxNTgzMTAsImV4cCI6MTc3NTE2MTkxMH0.aRuZGLlUX3pfvH6uyiUmRsShxwnEXIM0T-fMQTj6Z1Q"
                }
            }
        );

        console.log("Usuario:", respuesta.data);

    } catch (error) {
        console.error("Error:", error.response.data);
    }
};

obtenerUsuario();


