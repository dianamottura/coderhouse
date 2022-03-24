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
    console.log("contenido en chequear Carrito en ls ", contenidoEnStorage);

    // Si existe el array del carrito, lo retornará
    if (contenidoEnStorage) {
        let array = [];
        for (let i = 0; i < contenidoEnStorage.length; i++) {
            let alfajor = new Alfajor(contenidoEnStorage[i], contenidoEnStorage[i].cantidad);
            alfajor.actualizarPrecioTotal();
            array.push(alfajor);
        }

        return array;
    }
    // Si no existe ese array en el LS, esta función devolverá un array vacío
    return [];
}

function imprimirProductosEnHTML(alfajores) {
    // Obtenemos el div que contendrá nuestras cards
    let contenedor = document.getElementById("contenedor");

    // Recorremos el array y por cada item imprimimos una card
    for (const alfajor of alfajores) {
        // Creamos el contendor individual para cada card
        let card = document.createElement("div");

        // Agregamos el contenido a la card

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

        let boton = document.getElementById(`agregar${alfajor.id}`);

        boton.onclick = () => agregarAlCarrito(alfajor.id);

        // boton.addEventListener("click", () => agregarAlCarrito(alfajor.id));
    }
}

// Recibe el contenido del carrito y lo imprime en el html
// en una tabla
function dibujarTabla(array) {
    let contenedor = document.getElementById("carrito");
    contenedor.innerHTML = "";

    let precioTotal = obtenerPrecioTotal(array);

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

            <tbody id="bodyTabla" class="table">
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

    for (let alfajor of array) {
        let datos = document.createElement("div");
        datos.innerHTML = `
            <tr>
                <th scope="row"></th>
                <td scope="col">${alfajor.marca}</td>
                <td scope="col">${alfajor.cantidad}</td>
                <td scope="col">$${alfajor.precioTotal}</td>
                <td scope="col"><button id="eliminar${alfajor.id}" type="button" class="btn btn-dark">Eliminar</button></td>
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
        carrito.push(new Alfajor(alfajores[idProducto], 1));
    }

    localStorage.setItem("carritoEnStorage", JSON.stringify(carrito));
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
        // Obtenemos el índice donde se encuentra el alfajor
        // en el carrito de compras
        carrito[index].quitarUnidad();
        carrito[index].actualizarPrecioTotal();
    } else {
        // Si queda solo una unidad, se elimina del array
        // Para esto utilizamos el método splice
        // Este método sobreescribe el array original
        // Con alfajor id indicamos el índice del elemento en el array
        // a eliminar. El 1 es la cantidad de elementos a eliminar, como en este caso
        carrito.splice(index, 1);

        if (carrito.lenght === 0) {
            carrito = [];
        }
    }

    localStorage.setItem("carritoEnStorage", JSON.stringify(carrito));
    dibujarTabla(carrito);
}

// Recorremos el array para obtener el precio total de la compra
function obtenerPrecioTotal(array) {
    let precioTotal = 0;

    for (const producto of array) {
        precioTotal += producto.precioTotal;
    }

    return precioTotal;

    // return carrito.reduce((total, elemento) => total + elemento.precioTotal, 0);
}

// --- Invocación de funciones ---
imprimirProductosEnHTML(alfajores);

// Consulta al Storage para saber si hay información almacenada
// Si hay datos, se imprimen en el HTML al refrescar la página
carrito = chequearCarritoEnStorage();
dibujarTabla(carrito);
