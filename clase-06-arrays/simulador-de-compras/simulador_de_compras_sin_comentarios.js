// Funciones de orden superior en este código
// find, findIndex, filter, sort, reduce

// Este código se encuentra refactorizado
// Es decir, con la sintaxis lo más reducida posible

// El orden en el código es
// 1. Constructores de clase
// 2. Inicialización de variables
// 3. Construcción de funciones
// 4. Invocación de funciones

class Alfajor {
    constructor(alfajor) {
        this.id = alfajor.id;
        this.marca = alfajor.marca;
        this.precio = alfajor.precio;
        this.cantidad = 1;
        this.precioTotal = alfajor.precio;
    }

    agregarUnidad() {
        this.cantidad++;
    }

    quitarUnidad() {
        this.cantidad--;
    }

    actualizarPrecioTotal() {
        this.precioTotal = this.precio * this.cantidad;
    }
}

// Constantes y variables
const alfajores = [
    {
        id: 0,
        marca: "Aguila",
        descripcion: "Alfajor minitorta clasica",
        precio: 100,
    },
    {
        id: 1,
        marca: "Milka",
        descripcion: "Alfajor con mouse de chocolate",
        precio: 90,
    },
    {
        id: 2,
        marca: "Block",
        descripcion: "Alfajor con chocolate con mani",
        precio: 95,
    },
    {
        id: 3,
        marca: "Bon o Bon",
        descripcion: "Alfajor con pasta de mani",
        precio: 85,
    },
    {
        id: 4,
        marca: "Pepitos",
        descripcion: "Alfajor con chips de chocolate",
        precio: 90,
    },
    {
        id: 5,
        marca: "Guaymallen",
        descripcion: "Alfajor de chocolate",
        precio: 85,
    },
];

let carrito = [];
let precioTotal;

// ----- Declaración de funciones ----- //
function menuDeCompras() {
    let stringProductos = "";

    for (const alfajor of alfajores) {
        stringProductos += `${alfajor.id}: ${alfajor.marca}. Precio: $${alfajor.precio} \n`;
    }

    let idProducto = prompt(`
Escriba el número del producto a comprar, o escriba 'ESC' para finalizar 🍭🍫🍬
${stringProductos} \n`);

    while (idProducto !== "ESC") {
        let alfajorEnCarrito = carrito.find((elemento) => elemento.id == idProducto);

        if (alfajorEnCarrito) {
            let index = carrito.findIndex((elemento) => elemento.id === alfajorEnCarrito.id);

            carrito[index].agregarUnidad();
            carrito[index].actualizarPrecioTotal();

            alert(`
            Se ha añadido otra unidad del alfajor ${carrito[index].marca} 🎉
            Unidades: ${carrito[index].cantidad}`);
            console.table(carrito);
        } else {
            carrito.push(new Alfajor(alfajores[idProducto]));

            alert(`Se ha añadido al carrito el alfajor ${alfajores[idProducto].marca} 🎉`);
            console.table(carrito);
        }

        idProducto = prompt(`
Desea seguir comprando? 🤔
Escriba el número del producto a comprar, o escriba 'ESC' para finalizar 🍭🍫🍬
${stringProductos}`);
    }
}

function obtenerPrecioTotal() {
    let total = carrito.reduce((total, elemento) => {
        total + elemento.precioTotal, 0;
    });
    return total;
}

// Invocación de funciones
menuDeCompras();
precioTotal = obtenerPrecioTotal();

alert(`El precio total de tu compra es de $${precioTotal}
Gracias! 😄`);
console.table(carrito);

// Método sort() aplicado a un array de objetos
// Ordenamos el array alfajores por precio de manera ascendente
alfajores.sort((a, b) => a.precio - b.precio);
console.log("Array ordenado por precio ascendente");
console.table(alfajores);

// Array ordenado por precio de manera descendente
alfajores.sort((a, b) => a.precio - b.precio);
console.log("Array ordenado por precio descendente");
console.table(alfajores);

// Método filter()
// Listamos los alfajores con precio menor a $100
let nuevoArray = alfajores.filter((elemento) => elemento.precio < 100);
console.log("Nuevo array con precio menor a 100");
console.table(nuevoArray);
