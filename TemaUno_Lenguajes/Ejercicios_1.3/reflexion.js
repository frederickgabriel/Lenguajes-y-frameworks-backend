/* REFLEXION - EJERCICIO 1.3

1. ¿Cuál es la diferencia fundamental entre un módulo nativo (como
'fs')
y un módulo de NPM (como 'sillyname') en cuanto a su origen e
instalación?

R: En la manera en que se instalan mientras que los módulos nativos vienen preinstalados con Node.js,
los módulos de NPM deben ser instalados manualmente usando el comando npm install y se descargan 
desde el registro de NPM.


2. Investigando la sintaxis: ¿Qué diferencia existe entre 'require'
(CommonJS)
y 'import' (ES Modules)? Considera el momento en que se cargan los
módulos.

R: ambos sirven para cargar módulos dentro de un programa, pero funcionan de manera distinta 
Require pertenece al sistema CommonJS, que es el sistema tradicional que utilizaba Node.js 
mientras que import es parte del sistema de módulos ES Modules, que es el estándar moderno para JavaScript.


3. Sobre el archivo 'package.json':
a) ¿Por qué es vital compartir este archivo pero NO la carpeta
'node_modules' al subir a un repositorio?

R: es vital compartirlo porque funciona como la descripción oficial del proyecto, en él se encuentra 
el nombre del proyecto, su versión, los scripts que se pueden ejecutar y, sobre todo, la lista de 
dependencias necesarias para que la aplicación funcione correctamente


b) ¿Qué sucede si ejecutas 'npm install' en una carpeta que solo
tiene el package. json?

R:el sistema reconstruye completamente las dependencias del proyecto, 
dejándolo listo para ejecutarse sin necesidad de que alguien haya compartido previamente la carpeta node_modules.


*/