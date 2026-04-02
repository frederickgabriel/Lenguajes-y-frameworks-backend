
// POR FREDERICK GABRIEL AGUILAR PUC
import axios from "axios";

const obtenerUsuario = async () => {
    try {
        const respuesta = await axios.get('https://reqres.in/api/users/4',{

            headers: {
                'Authorization': 'Basic' + Buffer.from('frederickaguilar317@gmail.com.in:pistol').toString('base64'),
                "x-api-key": "pro_10cbda0000e23828e6e511b6f215ddff79f0ed8b3504c39a81de9baa4abdffa0"
            }
        });
        console.log('Usuario obtenido:', respuesta.data);
    } catch (error) {
        console.error('Error al obtener usuario:', error.response.data);
    }
};

obtenerUsuario();