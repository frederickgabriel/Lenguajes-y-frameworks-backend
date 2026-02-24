const fs = require('fs'); // Importa la herramienta de sistema de archivo


fs.writeFile('archivo.txt', 'Hola desde NodeJS', (err) => {
  if (err) throw err;
  console.log('El archivo ha sido creado con éxito.');
});


// Desafio 1: Lee el contenido del archivo que acabas de crear y muéstralo en la consola.


fs.readFile('archivo.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log('Contenido del archivo:', data);
});
