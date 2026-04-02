// POR FREDERICK GABRIEL AGUILAR PUC 
fetch('https://jsonplaceholder.typicode.com/posts')
.then(respuesta => {
    if (!respuesta.ok){
        throw new Error('Respuesta de servidor fallida' + respuesta.statusText);
    }
    return respuesta.json();
})

.then(datos => {
    console.log('datos recibidos: ', datos);
})

.catch(error => {
    console.error('Error al hacer la solicitud: ', error);
})