// El orden en el código es
// 1. Constructores de clase
// 2. Inicialización de variables
// 3. Construcción de funciones
// 4. Invocación de funciones

// Esta versión del programa no es perfecta
// Vamos a optimizar el código cuando incorporemos eventos
// Ahí veremos cómo interactuar con botones y cómo obtener datos de un form :)
// Cualquier sugerencia es bienvenida! Ya sea contenido que no haya quedado
// del todo claro o en el que quieran profundizar.
// Para lo que necesiten pueden escribirme por privado ^_^

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
];

let carrito = [];
let carritoEnHtml = document.getElementById("carrito");

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
                    <button id="agregar${alfajor.id}" type="button" class="btn btn-dark"> Agregar </button>
                </div>
            </div>
        </div>      
        `;

    // Una vez que tenemos creada la card, la agregamos al contenedor
    // que obtuvimos desde el HTML
    contenedor.appendChild(card);
  }
}

// Modularicé más el menú de compras para que quede más prolijo
function seleccionarProducto() {
  let idProducto =
    prompt(`Escriba el número del producto a comprar, o escriba 'ESC' para finalizar
0: ${alfajores[0].marca}, Precio: ${alfajores[0].precio}
1: ${alfajores[1].marca}, Precio: ${alfajores[1].precio}
2: ${alfajores[2].marca}, Precio: ${alfajores[2].precio}`);

  return idProducto;
}

function menuDeCompras() {
  let idProducto = seleccionarProducto();

  // Comienza el simulador de menu
  // El usuario podrá comprar hasta escribir ESC
  while (idProducto !== "ESC") {
    // imprimimos en el html el elemento que acabamos de agregar al carrito
    let mensaje = document.createElement("div");
    mensaje.textContent = `Se ha añadido al carrito el alfajor ${alfajores[idProducto].marca}`;
    carritoEnHtml.appendChild(mensaje);

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

    // Una vez que terminamos de agregar el producto al carrito
    // Volvemos a preguntar al usuario si desea seguir comprando
    // para que se siga ejecutando el while
    idProducto = seleccionarProducto();
  }

  // Una vez que finalizamos la compra informamos
  // el precio total de la misma
  let precioTotal = obtenerPrecioTotal();
  imprimirPrecioTotal(precioTotal);
}

// Recorremos el array para obtener el precio total de la compra
function obtenerPrecioTotal() {
  let precioTotal = 0;

  for (const producto of carrito) {
    precioTotal += producto.precioTotal;
  }

  return precioTotal;
}

function imprimirPrecioTotal(precioTotal) {
  // Se imprime en el contenedor del carrito el precio total
  // Creamos el div que contendrá el mensaje
  let mensaje = document.createElement("div");

  // Agregamos el mensaje a dicho div
  mensaje.textContent = `El precio total de tu compra es de ${precioTotal}`;

  // Enlazamos el div del mensaje en el div con la info del carrito
  carritoEnHtml.appendChild(mensaje);
}

// --- Invocación de funciones ---

// Si quieren usar lo de setTimeOut para que el menú de compras se
// ejecute luego de mostrar los productos en pantalla pueden hacerlo.
// Yo no quiero usar esa opción porque no es la idea
// y porque veremos como hacerlo de una manera más correcta
// en la clase de eventos :)
// Aquí lo importante es que el código que imprime el array está
// bien escrito
imprimirProductosEnHTML(alfajores);
menuDeCompras();
