// Arrays y contenidos para la primera pre-entrega
// Métodos de arrays: find(), filter(), sort(), findIndex()

// Simulador de tienda de alfajores
// Con este código voy a estar trabajando a medida que avancen los temas :)

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
];

let carrito = [];
let precioTotal;

// ----- Declaración de funciones ----- //
function menuDeCompras() {
    let idProducto = prompt(`
		Escriba el número del producto a comprar, o escriba 'ESC' para finalizar
		0: ${alfajores[0].marca}, Precio: ${alfajores[0].precio}
		1: ${alfajores[1].marca}, Precio: ${alfajores[1].precio}
		2: ${alfajores[2].marca}, Precio: ${alfajores[2].precio}`);

    // Comienza el simulador de menu
    // El usuario podrá comprar hasta escribir ESC
    while (idProducto !== "ESC") {
        // Verificamos si ese tipo de alfajor ya se encuentra en el array
        // para saber si sumarle uno a la cantidad de ese alfajor en el carrito
        // con el método find()
        // Este método en caso de dar true, nos devuelve el primer elemento
        // (en este caso un objeto)del array
        // que cumple con la condición de búsqueda.
        let alfajorEnCarrito = carrito.find((elemento) => {
            if (elemento.id == idProducto) {
                return true;
            }
        });

        if (alfajorEnCarrito) {
            // Si el alfajor se encuentra en el carrito,
            // se le sumará uno a la cantidad de esa marca en el carrito

            // Primero debemos hallar el index donde se encuentra
            // el alfajor en el carrito (ya que no va a ser el mismo que el del array alfajores);

            // El método findIndex() almacena en la variable index el número donde se encuentra
            // el elemento que cumple con la condición que le indicamos
            let index = carrito.findIndex((elemento) => {
                if (elemento.id === alfajorEnCarrito.id) {
                    return true;
                }
            });

            carrito[index].agregarUnidad();
            carrito[index].actualizarPrecioTotal();
            alert(`
            Se ha añadido otra unidad del alfajor ${carrito[index].marca}.
            Unidades: ${carrito[index].cantidad}`);
        } else {
            // El alfajor no se encuentra en el carrito, así que
            // lo pusheamos al array asignándole la clase Alfajor
            // para poder acceder a sus métodos
            carrito.push(new Alfajor(alfajores[idProducto]));
            alert(`Se ha añadido al carrito el alfajor ${alfajores[idProducto].marca}`);
        }

        // Una vez que terminamos de agregar el producto al carrito
        // Volvemos a preguntar al usuario si desea seguir comprando
        // para que se siga ejecutando el while
        idProducto = prompt(
            `
			Desea seguir comprando?
			Escriba el número del producto a comprar, o escriba 'ESC' para finalizar
			0: ${alfajores[0].marca}, Precio: ${alfajores[0].precio}
			1: ${alfajores[1].marca}, Precio: ${alfajores[1].precio}
			2: ${alfajores[2].marca}, Precio: ${alfajores[2].precio}
			`
        );
    }
}

// Recorremos el array para obtener el precio total de la compra
function obtenerPrecioTotal() {
    let precioTotal = 0;
    for (const producto of carrito) {
        precioTotal += producto.precioTotal;
    }

    return precioTotal;
}

// Invocación de funciones
menuDeCompras();
precioTotal = obtenerPrecioTotal();

alert(`El precio total de tu compra es de $${precioTotal}
Gracias!`);
console.table(carrito);

// Método sort() aplicado a un array de objetos
// Ordenamos el array alfajores por precio
let arrayOrdenadoPorPrecio = alfajores.sort((a, b) => a.precio - b.precio);
console.log("Array ordenado por precio");
console.table(arrayOrdenadoPorPrecio);
