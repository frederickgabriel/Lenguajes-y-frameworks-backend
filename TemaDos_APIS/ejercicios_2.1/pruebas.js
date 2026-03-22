// por frederick gabriel aguilar puc 
/*
const objetoJavaScript = {
    nombre: "Taco de Pollo",
    ingredientes: {
        proteina: "Pollo",
        salsa: "Salsa Verde"
    }
};

const jsonString = JSON.stringify(objetoJavaScript);

console.log(jsonString);
*/


const jsonString = '{"nombre":"Taco de Pollo","ingredientes":{"proteina":"Pollo","salsa":"Salsa Verde"}}';

const objetoDeserializado = JSON.parse(jsonString);

console.log(objetoDeserializado);