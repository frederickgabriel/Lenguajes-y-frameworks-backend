// por frederick gabriel aguilar puc
// a) Igualdad exacta con toBe
function suma(a, b) {
    return a + b;
}

// b) Comparación de objetos con toEqual
function crearPersona(nombre, edad) {
    return { nombre, edad };
}

// c) Verificación de valores nulos y definidos
function obtenerValorNulo() {
    return null;
}

function obtenerValorUndefined() {
    return undefined;
}

function obtenerValorDefinido() {
    return "Hola Mundo";
}

// d) Comparaciones numéricas
function obtenerNumero() {
    return 15;
}

// e) Coincidencia de cadenas con Expresiones Regulares
function obtenerEmail() {
    return "usuario@example.com";
}

// f) Verificación de contenido en Arrays
function obtenerFrutas() {
    return ["manzana", "pera", "naranja", "mango"];
}

// g) Negación de Matchers con .not
function obtenerColor() {
    return "azul";
}

// h) Pruebas Asincronas con Promesas
function promesaExitosa() {
    return Promise.resolve("¡Operación exitosa!");
}

function promesaFallida() {
    return Promise.reject(new Error("¡Operación fallida!"));
}


module.exports = {
    suma,
    crearPersona,
    obtenerValorNulo,
    obtenerValorUndefined,
    obtenerValorDefinido,
    obtenerNumero,
    obtenerEmail,
    obtenerFrutas,
    obtenerColor,
    promesaExitosa,
    promesaFallida,
};