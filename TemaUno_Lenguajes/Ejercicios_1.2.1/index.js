// ejercicios 1.2.1 sintaxis básica de node.js
// frederick gabriel aguilar puc                 inciso a


var x = 10;
let b = 1.2;
const z = "hola mundo";
const cars = ["Saab", "Volvo", "BMW"]; // inciso b

const datos = ["Saab", 2, 1.5, true, null]; // inciso c


function polinomica(a, b, c) { // inciso d
  return a ** 2 + b * c;
}
let resultado = polinomica(2, 3, 4);



let bob = (a) => a + 100;// inciso e
resultadobob = bob(50); 


function numerosDescendentes() { // inciso f
    for (let i = 10; i >= 1; i--) {
        console.log(i);
    }
}
numerosDescendentes();



const libro = {                       //inciso g
    titulo: "Introducción a JavaScript",
    autor: "frederick gabriel aguilar puc",
    disponible: true,

};

console.log(libro.titulo);
console.log(libro.autor);
console.log(libro.disponible);



const libro2 = {                       //inciso h
  titulo: "Introducción a JavaScript",
  autor: "frederick gabriel aguilar puc",
  disponible: true,

  mostrarDescripcion2: function () {
    console.log(
      "Hola, soy " +
        this.autor +
        ", tengo un libro de " +
        this.titulo +
        " y esta disponible " +
        this.disponible,
    );
  },
};

libro2.mostrarDescripcion2();




const operaciones = require('./operaciones');      // inciso i
console.log("Suma: " + operaciones.suma(10, 5));           
console.log("Resta: " + operaciones.resta(10, 5));         
console.log("Multiplicación: " + operaciones.multiplicacion(10, 5));  
console.log("División: " + operaciones.division(10, 5)); 


// inciso j
function esperarYSaludar(nombre, callback) {
    setTimeout(function() {
        callback("Hola " + nombre);
    }, 2000); // Espera 2 segundos
}

// Usar la función
esperarYSaludar("Carlos", function(mensaje) {
    console.log(mensaje);
});

console.log("Esperando...");



// inciso k
let cadena = "123";

try {
    let numero = Number(cadena);
    console.log("Número: " + numero);
} catch (error) {
    console.log("Error al convertir");
}


console.log(x, b, z, cars, datos, resultado, resultadobob);
