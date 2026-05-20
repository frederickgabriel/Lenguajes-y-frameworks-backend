// por frederick gabriel aguilar puc 
const {
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
} = require("./suma");

test('suma de 1 y 2 es igual a 3', () => {
    expect(suma(1, 2)).toBe(3);
});

// a) toBe - Igualdad exacta
test("10 + 10 es igual a 20", () => {
    expect(suma(10, 10)).toBe(20);
});

// b) toEqual - Comparación de objetos
test("dos objetos con las mismas propiedades son iguales", () => {
    expect(crearPersona("Ana", 25)).toEqual({ nombre: "Ana", edad: 25 });
});

// c) toBeNull / toBeUndefined / toBeDefined
test("el valor es null", () => {
    expect(obtenerValorNulo()).toBeNull();
});
test("el valor es undefined", () => {
    expect(obtenerValorUndefined()).toBeUndefined();
});
test("el valor está definido", () => {
    expect(obtenerValorDefinido()).toBeDefined();
});

// d) Comparaciones numéricas
test("15 es mayor que 10", () => {
    expect(obtenerNumero()).toBeGreaterThan(10);
});
test("15 es menor que 20", () => {
    expect(obtenerNumero()).toBeLessThan(20);
});
test("15 es mayor o igual a 15", () => {
    expect(obtenerNumero()).toBeGreaterThanOrEqual(15);
});

// e) toMatch - Expresiones Regulares
test("el email contiene '@example.com'", () => {
    expect(obtenerEmail()).toMatch(/@example\.com$/);
});

// f) toContain - Arrays
test("el array contiene 'naranja'", () => {
    expect(obtenerFrutas()).toContain("naranja");
});

// g) .not - Negación
test("el color no es 'rojo'", () => {
    expect(obtenerColor()).not.toBe("rojo");
});

// h) Promesas asíncronas
test("la promesa se resuelve correctamente", () => {
    return expect(promesaExitosa()).resolves.toBe("¡Operación exitosa!");
});
test("la promesa es rechazada con un error", () => {
    return expect(promesaFallida()).rejects.toThrow("¡Operación fallida!");
});