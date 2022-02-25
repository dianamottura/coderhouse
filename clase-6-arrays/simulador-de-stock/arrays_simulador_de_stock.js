/* Buenas prácticas */
// Orden del código
// 1. Clases constructoras
// 2. Declaración de variables
// 3. Creación de funciones
// 4. Invocación de funciones

class Producto {
    constructor(nombre, precio, cantidad) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidadDisponible = cantidad;
        this.estaDisponible = true;
    }

    // métodos de la clase
    sumarIva() {
        // Siempre encerrar los valores en variables para que quien lea
        // el código sepa de dónde sale el número
        let valorIVA = 1.21;
        // return this.precio * 1.21;
        this.precio *= valorIVA;
    }

    aplicarImpuestoPais() {
        let impuesto = 1.35;
        return (this.precio *= impuesto);
    }

    vender() {
        // Si hay stock, lo puedo vender
        if (this.cantidadDisponible >= 1) {
            // this.cantidadDisponible = this.cantidadDisponible - 1;
            // this.cantidadDisponible -= 1;
            this.cantidadDisponible--;
            // Aquí validamos el caso en el que el producto vendido sea el último disponible
            if (this.cantidadDisponible == 0) {
                this.estaDisponible = false;
            }
        } else {
            this.estaDisponible = false;
        }
    }
}

// Inicializamos el array en donde almacenaremos los productos
// que vayamos ingresando (simulador de carga de stock)
let productos = [];

function agregarProductos() {
    let nombre = prompt("Ingrese el nombre del producto o escriba FIN para finalizar");

    while (nombre.toUpperCase() !== "FIN") {
        let precio = parseFloat(prompt("Ingrese el precio del producto"));
        let cantidad = Number(prompt("Ingrese el stock del producto"));

        productos.push(new Producto(nombre, precio, cantidad));

        // Vuelvo a pedir el dato que condiciona el while para que este siga ejecutandose
        nombre = prompt("Ingrese el nombre del producto o escriba FIN para finalizar");
    }

    alert("Finalizaste el ingreso de productos");

    console.table(productos);
}

function imprimirProductos() {
    // Uso del for of, exclusivo para recorrer arrays
    for (const producto of productos) {
        // template string
        console.log(`
		Nombre: ${producto.nombre}
		Precio: $${producto.precio}		
		Stock disponible: ${producto.cantidadDisponible}
		`);

        // console.log("Nombre: " + producto.nombre + "\nPrecio: " + producto.precio);
    }
}

function agregarIVAProductos() {
    for (const producto of productos) {
        producto.sumarIva();
    }

    imprimirProductos();
}

// Invocación de funciones
agregarProductos();
agregarIVAProductos();
