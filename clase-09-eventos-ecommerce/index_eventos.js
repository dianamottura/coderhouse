// Versión sin uso de Storage
// Si refrescan la página todos los productos que agregamos
// al carrito se perderán

// El orden en el código es
// 1. Constructores de clase
// 2. Inicialización de variables
// 3. Construcción de funciones
// 4. Invocación de funciones

// Cualquier sugerencia es bienvenida! Ya sea contenido que no haya quedado
// del todo claro o en el que quieran profundizar.
// Para lo que necesiten pueden escribirme por privado,
// no importa si no son alumnos mios ^_^

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

let carrito = [];

// ----- Declaración de funciones ----- //

// Imprime catálogo de alfajores en el HTML
// Recibimos por parámetro el array
function imprimirProductosEnHTML(alfajores) {
    // Obtenemos el div que contendrá nuestras cards
    let contenedor = document.getElementById("contenedor");

    // Recorremos el array y por cada item imprimimos una card
    for (const alfajor of alfajores) {
        // Creamos el contendor individual para cada card
        let card = document.createElement("div");

        // Agregamos el contenido a la card
        // Esto es con clases de bootstrap
        // Si necesitan una versión más sencilla haganmelo saber :)
        card.innerHTML = `
        <div class="card text-center" style="width: 18rem;">
            <div class="card-body">
                <img src="${alfajor.img}" id="" class="card-img-top img-fluid" alt="">
                <h2 class="card-title">${alfajor.marca}</h2>
                <h5 class="card-subtitle mb-2 text-muted">${alfajor.descripcion}</h5>
                <p class="card-text">$${alfajor.precio}</p>

                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                    <button id="agregar${alfajor.id}" type="button" onclick="" class="btn btn-dark"> Agregar </button>
                </div>
            </div>
        </div>      
        `;

        // Una vez que tenemos creada la card, la agregamos al contenedor
        // que obtuvimos desde el HTML
        contenedor.appendChild(card);

        // Es hora de asignar el evento al botón
        // Observen que al id del botón lo nombramos de manera dinámica, asignándole al nombre
        // la palabra "agregar" seguida del id del alfajor. Esto nos crea un nombre único
        // por cada botón, haciendo referencia a la card seleccionada
        let boton = document.getElementById(`agregar${alfajor.id}`);

        // Al botón le pasamos dos parámetros:
        // el evento click seguido de la función que queremos que se ejecute
        // al disparar el evento
        boton.onclick = () => agregarAlCarrito(alfajor.id);
        // boton.addEventListener("click", () => agregarAlCarrito(alfajor.id));
    }
}

// Recibe el contenido del carrito y lo imprime en el html
// en una tabla
function dibujarTabla(carrito) {
    let contenedor = document.getElementById("carrito");
    contenedor.innerHTML = "";

    let precioTotal;

    precioTotal = obtenerPrecioTotal(carrito);

    // Creamos el div que contendrá la tabla
    let tabla = document.createElement("div");

    // A ese div le agregaremos todos los datos de la tabla
    tabla.innerHTML = `
        <table id="tablaCarrito" class="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                    <th scope="col">Item</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Precio Parcial</th>
                    <th scope="col">Accion</th>
                </tr>
            </thead>

            <tbody id="bodyTabla">
                <tr>
                    <td scope="col">Total: $${precioTotal}</td>
                    <td scope="col"> </td>
                    <td scope="col"> </td>
                    <td scope="col"> </td>
                </tr>
            <tr> 
                <td> <button id="vaciarCarrito" class="btn btn-dark"> Vaciar Carrito </button> </td>
            </tr>

            </tbody>
        </table>
    `;

    contenedor.appendChild(tabla);

    // Una vez que dibujamos la tabla, obtenemos el id del body de la tabla
    // donde imprimiremos los datos del array
    let bodyTabla = document.getElementById("bodyTabla");
    for (let alfajor of carrito) {
        let datos = document.createElement("div");
        datos.innerHTML = `
            <tr>
                <th scope="row">1</th>
                <td>${alfajor.marca}</td>
                <td>${alfajor.cantidad}</td>
                <td>$${alfajor.precioTotal}</td>
                <td><button id="eliminar${alfajor.id}" type="button" class="btn btn-dark">Eliminar</button></td>
            </tr>
      `;

        bodyTabla.appendChild(datos);

        // Asignamos el evento click al botón para eliminar un producto del carrito
        $(`#eliminar${alfajor.id}`).on("click", () => {
            eliminarDelCarrito(alfajor.id);
        });
    }
}

function agregarAlCarrito(idProducto) {
    // Verificamos si ese tipo de alfajor ya se encuentra en el array
    // con el método find()
    // Este método en caso de dar true, nos devuelve el primer elemento del array
    // que cumple con la condición de búsqueda
    let alfajorEnCarrito = carrito.find((elemento) => {
        if (elemento.id == idProducto) {
            return true;
        }
    });

    if (alfajorEnCarrito) {
        // Si el alfajor se encuentra en el carrito, alfajorEnCarrito devolverá
        // true, por lo cual se ejecutará este bloque de código
        // y se le sumará uno a la cantidad de esa marca en el carrito

        // Primero debemos hallar el index donde se encuentra
        // el alfajor en el carrito (ya que no va a ser el mismo que el del array alfajores);
        let index = carrito.findIndex((elemento) => {
            if (elemento.id === alfajorEnCarrito.id) {
                return true;
            }
        });

        carrito[index].agregarUnidad();
        carrito[index].actualizarPrecioTotal();
    } else {
        // El alfajor no se encuentra en el carrito, así que
        // lo pusheamos al array asignándole la clase Alfajor
        // para poder acceder a sus métodos
        carrito.push(new Alfajor(alfajores[idProducto]));
    }

    // Una vez que actualizamos el carrito, llamamos a la función
    // que dibuja la tabla en el html para visualizar los productos
    dibujarTabla(carrito);
}

function eliminarDelCarrito(id) {
    // Buscamos el item en el carrito
    let alfajor = carrito.find((alfajor) => alfajor.id === id);

    let index = carrito.findIndex((element) => {
        if (element.id === alfajor.id) {
            return true;
        }
    });

    // Primero chequeamos el stock para saber si hay que restarle 1
    // o quitar el elemento del array
    if (alfajor.cantidad > 1) {
        console.log(`cantidad disponible: ${alfajor.cantidad}`);

        // Obtenemos el índice donde se encuentra el alfajor
        // en el carrito de compras
        carrito[index].quitarUnidad();
        carrito[index].actualizarPrecioTotal();
    } else {
        // Si queda solo una unidad, se elimina del array
        // Para esto utilizamos el método splice
        // Este método sobreescribe el array original
        // Con alfajor id indicamos el índice del elemento en el array
        // a eliminar. El 1 es la cantidad de elementos a eliminar, es este caso, 1 solo
        carrito.splice(index, 1);

        if (carrito.lenght === 0) {
            carrito = [];
        }
    }

    dibujarTabla(carrito);
}
// Recorremos el array para obtener el precio total de la compra
function obtenerPrecioTotal(array) {
    let precioTotal = 0;

    for (const producto of array) {
        precioTotal += producto.precioTotal;
    }

    return precioTotal;
}

// --- Invocación de funciones ---
imprimirProductosEnHTML(alfajores);
