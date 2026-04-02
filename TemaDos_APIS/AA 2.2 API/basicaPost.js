// POR FREDERICK GABRIEL AGUILAR PUC
import axios from "axios";

const registrarUsuario = async () => {
    try {
        const respuesta = await axios.post('https://reqres.in/api/register',
            {
                email: "eve.holt@reqres.in",
                password: "pistol"

            },
            {
                headers: {
                    "x-api-key": "pro_10cbda0000e23828e6e511b6f215ddff79f0ed8b3504c39a81de9baa4abdffa0"
                }
            }
        );

        console.log('Registro exitoso:', respuesta.data);

    } catch (error) {
        console.error('Error en el registro:', error.response.data);
    }
};

registrarUsuario();
