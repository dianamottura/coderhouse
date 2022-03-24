// STORAGE

// localStorage
// Los datos persisten por más que cerremos el navegador.

// sessionStorage
// Los datos persisten hasta que se cierra el navegador.

// Podemos ver el storage de nuestro navegador
// en la pestaña Application o Storage depende qué browser tengamos

// Propiedades del local y sessionStorage

// Length se comporta igual que la propiedad lenght del array
// Nos devolverá el largo de nuestro storage
console.log("Length del localStorage", localStorage.length); 
console.log("Length del sessioStorage", sessionStorage.length);


// Métodos del local y sessionStorage

// setItem
// guarda un valor en el==================///////===umitivo: numérico, booleano o string
let miValor = 5;
localStorage.setItem("myKey", "myValue");
localStorage.setItem("myKey", miValor);

sessionStorage.setItem("myKey", "myValue");
sessionStorage.setItem("myKey", miValor);

// getItem
// nos devuelve el valor contenido en la llave/clave que guardamos
// en el storage
let miValorEnElStorage = localStorage.getItem("myKey");
console.log("miValorEnLocalStorage", miValorEnElStorage);

// .key
// Devuelve el nombre de la llave/key indicada en el argumento
console.log(localStorage.key(1));

// removeItem
// Elimina el elemento contenido en la llave que le pasemos por parámetro
localStorage.removeItem("myKey")

// Almacenando estructuras de datos en el storage
// Cómo guardar objetos y/o arrays en el storage

// JSON.parse y JSON.stringify
let miArray = [{nombre: "Laura"}, {nombre: "Diana"}, {nombre: "Gonzalo"}];

