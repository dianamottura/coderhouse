// reduce
// splice
// filter
// find
// findIndex

// let alfajor = carrito.find((alfajor) => alfajor.id === id);

// let index = carrito.findIndex((element) => {
//     if (element.id === alfajor.id) {
//         return true;
//     }
// });

// splice
let array = [2, 3, 1, 345, 123, 67, 4];
console.table(array);
nombres = [{ nombre: "Diana", apellido: "Mottura" }];
let numABuscar = Number(prompt("Ingrese un numero"));

let existe = array.find((elemento) => elemento === numABuscar);

if (existe) {
    let index = array.findIndex((elemento) => elemento === existe);
    console.log(index);

    array.splice(index, 1);
    console.table(array);
} else {
    console.log("no se encontró");
}

let nuevoArray = array.filter((elemento) => elemento < 100);
console.table("array filtrado ", nuevoArray);

for (const numero of nuevoArray) {
    let indexN = array.findIndex((elemento) => elemento === numero);
    array.splice(indexN, 1);
}
console.table(array);

function obtenerPrecioTotal(array) {
    let total = 0;

    for (const elemento of array) {
        total += elemento;
    }

    return precioTotal;

    return carrito.reduce((total, elemento) => total + elemento.precioTotal, 0);
}

array = [2, 3, 1, 345, 123, 67, 4];
let array2 = ["diana", "juli", "ernesto", "diego"];

let totalCarrito = array2.reduce((total, elemento) => total + elemento, "");
totalCarrito = obtenerPrecioTotal(carrito);
