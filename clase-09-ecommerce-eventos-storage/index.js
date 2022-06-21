// Versión con uso de Storage
class Alfajor {
    constructor(alfajor, cantidad) {
        this.id = alfajor.id;
        this.marca = alfajor.marca;
        this.precio = alfajor.precio;
        this.cantidad = cantidad;
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
        img: "./img/aguilaclasica.jpg",
    },
    {
        id: 1,
        marca: "Milka",
        descripcion: "Alfajor con mouse de chocolate",
        precio: 90,
        img: "./img/milka mouse.jpg",
    },
    {
        id: 2,
        marca: "Block",
        descripcion: "Alfajor con chocolate con mani",
        precio: 95,
        img: "./img/coflerblock.jpg",
    },
    {
        id: 3,
        marca: "Bon o Bon",
        descripcion: "Alfajor con pasta de mani",
        precio: 85,
        img: "./img/bonobon.jpg",
    },
    {
        id: 4,
        marca: "Pepitos",
        descripcion: "Alfajor con chips de chocolate",
        precio: 90,
        img: "./img/pepitos.jpg",
    },
    {
        id: 5,
        marca: "Guaymallen",
        descripcion: "Alfajor de chocolate",
        precio: 85,
        img: "./img/guaymallenchocolate.jpg",
    },
];

let carrito;

// ----- Declaración de funciones ----- //
function chequearCarritoEnStorage() {
    let contenidoEnStorage = JSON.parse(localStorage.getItem("carritoEnStorage"));

    // Si existe el array del carrito, lo retornará
    // y actualizará la tabla de compras
    if (contenidoEnStorage) {
        // Al traer los datos del storage perdemos las instancias de clase
        // Para recuperarlas genero una copia del array con la info del storage
        // instanciando la clase en cada objeto del array
        let array = [];

        for (const objeto of contenidoEnStorage) {
            // Recibo los datos del objeto del storage
            // los guardo en la variable alfajor con la instancia de clase
            let alfajor = new Alfajor(objeto, objeto.cantidad);
            alfajor.actualizarPrecioTotal();

            // Envio ese objeto instanciado al arrray
            array.push(alfajor);
        }

        imprimirTabla(array);

        // Una vez que terminamos, la función retorna ese nuevo array con los datos recuperados
        return array;
    }

    // Si no existe ese array en el LS, esta función devolverá un array vacío
    return [];
}

function imprimirProductosEnHTML(array) {
    // Obtenemos el div que contendrá nuestras cards
    let contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = "";

    // Recorremos el array y por cada item imprimimos una card
    for (const alfajor of array) {
        // Creamos el contendor individual para cada card
        let card = document.createElement("div");

        // Agregamos el contenido a la card
        // Observar cómo el nombre del id del botón se genera
        // de manera dinámica
        card.innerHTML = `
        <div class="card text-center" style="width: 18rem;">
            <div class="card-body">
                <img src="${alfajor.img}" id="" class="card-img-top img-fluid" alt="">
                <h2 class="card-title">${alfajor.marca}</h2>
                <h5 class="card-subtitle mb-2 text-muted">${alfajor.descripcion}</h5>
                <p class="card-text">$${alfajor.precio}</p>

                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                    <button id="agregar${alfajor.id}" type="button" class="btn btn-dark"> Agregar </button>
                </div>
            </div>
        </div>      
        `;

        // Una vez que tenemos creada la card, la agregamos al contenedor
        // que obtuvimos desde el HTML
        contenedor.appendChild(card);

        // Luego de agregar la card al DOM,
        // asignamos el evento al botón correspondiente, habiendo nombrado su id de manera
        // dinámica
        let boton = document.getElementById(`agregar${alfajor.id}`);
        boton.addEventListener("click", () => agregarAlCarrito(alfajor.id));
    }
}

function agregarAlCarrito(idProducto) {
    // Verificamos si ese tipo de alfajor ya se encuentra en el array
    // con el método find()
    // Este método en caso de dar true, nos devuelve el primer elemento del array
    // que cumple con la condición de búsqueda
    let alfajorEnCarrito = carrito.find((elemento) => elemento.id === idProducto);

    if (alfajorEnCarrito) {
        // Si el alfajor se encuentra en el carrito, alfajorEnCarrito devolverá
        // true, por lo cual se ejecutará este bloque de código
        // y se le sumará uno a la cantidad de esa marca en el carrito

        // Primero debemos hallar el index donde se encuentra
        // el alfajor en el carrito (ya que no va a ser el mismo que el del array alfajores);
        let index = carrito.findIndex((elemento) => elemento.id === alfajorEnCarrito.id);

        // Una vez que obtenemos el index donde se halla el elemento ya agregado
        // al carrito, invocamos a los métodos que actualizaran unidades y precio total
        // De unidades repetidas
        carrito[index].agregarUnidad();
        carrito[index].actualizarPrecioTotal();
    } else {
        // El alfajor no se encuentra en el carrito, así que
        // lo pusheamos al array asignándole la clase Alfajor
        // para poder acceder a sus métodos

        // En esta instancia, tenemos que inicializar la propiedad
        // cantidad en 1. Es el 2do argumento que pasamos al instanciar
        // el objeto
        carrito.push(new Alfajor(alfajores[idProducto], 1));
    }

    // Actualizamos el storage y el contenido de la tabla
    localStorage.setItem("carritoEnStorage", JSON.stringify(carrito));
    imprimirTabla(carrito);
}

function eliminarDelCarrito(id) {
    // Buscamos el item en el carrito
    // Primero buscamos que coincida el ID recibido con el ID del objeto
    // a eleminar en el carrito
    let alfajor = carrito.find((alfajor) => alfajor.id === id);

    // Aquí buscamos el índice del producto en el carrito a eliminar
    let index = carrito.findIndex((element) => element.id === alfajor.id);

    // Primero chequeamos el stock para saber si hay que restarle 1
    // al stock o quitar el elemento del array
    if (alfajor.cantidad > 1) {
        // Si hay más de una unidad de ese producto, invocamos los métodos correspondientes
        carrito[index].quitarUnidad();
        carrito[index].actualizarPrecioTotal();
    } else {
        // Si queda solo una unidad, se elimina del array
        // Para esto utilizamos el método splice
        // Este método sobreescribe el array original
        // Con alfajor id indicamos el índice del elemento en el array
        // a eliminar. El 1 es la cantidad de elementos a eliminar, como en este caso
        carrito.splice(index, 1);
    }

    swal("Producto eliminado con éxito", "", "success");

    localStorage.setItem("carritoEnStorage", JSON.stringify(carrito));
    imprimirTabla(carrito);
}

function eliminarCarrito() {
    carrito = [];
    localStorage.removeItem("carritoEnStorage");

    document.getElementById("carrito").innerHTML = "";
    document.getElementById("acciones-carrito").innerHTML = "";
}

function obtenerPrecioTotal(array) {
    return array.reduce((total, elemento) => total + elemento.precioTotal, 0);
}

// Recibe el contenido del carrito y lo imprime en el html
// en una tabla
function imprimirTabla(array) {
    let precioTotal = obtenerPrecioTotal(array);
    let contenedor = document.getElementById("carrito");
    contenedor.innerHTML = "";

    // Creamos el div que contendrá la tabla
    let tabla = document.createElement("div");

    // A ese div le agregaremos todos los datos de la tabla
    tabla.innerHTML = `
        <table id="tablaCarrito" class="table table-striped">
            <thead>         
                <tr>
                    <th>Item</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Accion</th>
                </tr>
            </thead>

            <tbody id="bodyTabla">
            </tbody>
        </table>
    `;

    contenedor.appendChild(tabla);

    // Una vez que dibujamos la tabla, obtenemos el id del body de la tabla
    // donde imprimiremos los datos del array
    let bodyTabla = document.getElementById("bodyTabla");

    for (let alfajor of array) {
        let datos = document.createElement("tr");
        datos.innerHTML = `
                <td>${alfajor.marca}</td>
                <td>${alfajor.cantidad}</td>
                <td>$${alfajor.precioTotal}</td>
                <td><button id="eliminar${alfajor.id}" class="btn btn-dark">Eliminar</button></td>
      `;

        bodyTabla.appendChild(datos);

        let botonEliminar = document.getElementById(`eliminar${alfajor.id}`);
        botonEliminar.addEventListener("click", () => eliminarDelCarrito(alfajor.id));
    }

    let accionesCarrito = document.getElementById("acciones-carrito");
    accionesCarrito.innerHTML = `
		<h5>PrecioTotal: $${precioTotal}</h5></br>
		<button id="vaciarCarrito" onclick="eliminarCarrito()" class="btn btn-dark">Vaciar Carrito</button>
	`;
}

function filtrarBusqueda(e) {
    e.preventDefault();

    // Tomo el value del input y le agrego toLowerCase para que la búsqueda no sea
    // case sensitive
    let ingreso = document.getElementById("busqueda").value.toLowerCase();
    let arrayFiltrado = alfajores.filter((elemento) => elemento.marca.toLowerCase().includes(ingreso));

    imprimirProductosEnHTML(arrayFiltrado);
}

// --- Eventos
let btnFiltrar = document.getElementById("btnFiltrar");
btnFiltrar.addEventListener("click", filtrarBusqueda);

// Ejecución del código
// --- Invocación de funciones ---
imprimirProductosEnHTML(alfajores);

// Consulta al Storage para saber si hay información almacenada
// Si hay datos, se imprimen en el HTML al refrescar la página
carrito = chequearCarritoEnStorage();
