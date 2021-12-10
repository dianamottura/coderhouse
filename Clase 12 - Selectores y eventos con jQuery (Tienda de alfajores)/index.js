class Alfajor {
    constructor(alfajor) {
        this.id = alfajor.id;
        this.marca = alfajor.marca;
        this.cantidad = alfajor.cantidad;
        this.precio = alfajor.precio;
        this.precioTotal = alfajor.precio;
    }

    agregarUnidadAlStock() {
        return this.cantidad++;
    }

    quitarCantidadDelStock() {
        return (this.cantidad -= 1);
    }

    actualizarPrecio() {
        return (this.precioTotal = this.precio * this.cantidad);
    }
}

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

// Se chequea si hay pedidos en el localStorage
// y en caso de que haya se imprime en el HTML
let carrito = chequearCarritoEnLS();

console.log("contenido del carrito: ", carrito);
dibujarTabla(carrito);

function chequearCarritoEnLS() {
    let contenidoEnStorage = JSON.parse(localStorage.getItem("carritoEnStorage"));
    console.log("contenido en chequear Carrito en ls ", contenidoEnStorage);

    // Si existe el array del carrito, lo retornará
    if (contenidoEnStorage) {
        let array = [];
        for (let i = 0; i < contenidoEnStorage.length; i++) {
            console.log("indices del array: ", contenidoEnStorage[i].marca);
            array.push(new Alfajor(contenidoEnStorage[i]));
        }
        console.log("array: ", array);
        return array;
    }
    // Si no existe ese array en el LS, esta función devolverá un array vacío
    return [];
}

// Imprimir catálogo de alfajores en el HTML
// Esto podría ser una función!
for (let alfajor of alfajores) {
    $("#cuerpo").append(`
    <div class="card text-center" style="width: 18rem;">
        <div class="card-body">
            <img src="${alfajor.img}" id="" class="card-img-top img-fluid" alt="">
            <h2 class="card-title">${alfajor.marca}</h2>
            <h5 class="card-subtitle mb-2 text-muted">${alfajor.descripcion}</h5>
            <p class="card-text">$${alfajor.precio}</p>
            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button id="agregar${alfajor.id}" type="button" onclick="agregarCarrito(${alfajor.id})" class="btn btn-dark"> Agregar </button>
            </div>
        </div>
    </div>      
    `);
}

function dibujarTabla(carrito) {
    let precioTotal;
    // carrito = chequearCarritoEnLS();
    // Obtener el precio total del carrito
    if (carrito) {
        precioTotal = carrito.reduce((total, elemento) => total + elemento.precioTotal, 0);
    }

    $("#carro").empty();
    $("#carro").append(`
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
                    <td>Total: $${precioTotal}</td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                </tr>
            <tr> 
                <td> <button id="vaciarCarrito" class="btn btn-dark"> Vaciar Carrito </button> </td>
            </tr>

            </tbody>
        </table>
    `);

    for (let alfajor of carrito) {
        $("#bodyTabla").append(`
            <tr>
                <th scope="row">1</th>
                <td>${alfajor.marca}</td>
                <td>${alfajor.cantidad}</td>
                <td>$${alfajor.precioTotal}</td>
                <td><button id="eliminar${alfajor.id}" type="button" class="btn btn-dark">Eliminar</button></td>
            </tr>
      `);

        // Asignamos el evento click al botón correspondiente al elemento
        $(`#eliminar${alfajor.id}`).on("click", () => {
            eliminarDelCarrito(alfajor.id);
        });
        console.log("se agrego al carrito", alfajor.marca);
    }
}

function agregarCarrito(id) {
    // Primero buscamos si el item ya se agregó en el carrito
    let alfajor = carrito.find((alfajor) => alfajor.id === id);
    // Si existe el alfajor en el carrito, se le suma 1 a la cantidad
    // en la tabla y se actualiza el precio x unidad
    console.log(`alfajor encontrado con find en el array del carrito: ${alfajor}`);
    if (alfajor) {
        console.log(alfajor);

        // Obtenemos el índice donde se encuentra el alfajor
        // en el carrito de compras
        let index = carrito.findIndex((element) => {
            if (element.id === alfajor.id) {
                return true;
            }
        });
        console.log(`Indice del alfajor agregado ${alfajor.marca} en el carrito: ${index}`);
        console.log("Carrito[index]: ", carrito[index]);
        console.log("Carrito: ", carrito);
        carrito[index].cantidad++;
        carrito[index].actualizarPrecio();
        console.log("funcion actualizar precio: ", carrito[index].actualizarPrecio());
    } else {
        // Si el alfajor no estaba en el carrito, find() devuelve undefined.
        // El if lo toma como false y procedemos a agregar
        // el nuevo tipo de alfajor al carrito
        // buscando el alfajor a agregar en el array de los productos
        alfajor = alfajores.find((alfajor) => alfajor.id === id);
        let nuevoAlfajor = new Alfajor(alfajor);
        nuevoAlfajor.cantidad = 1;
        console.log("nuevo alfajor ", nuevoAlfajor);

        carrito = chequearCarritoEnLS();
        console.log(`carrito ${carrito}`);
        carrito.push(nuevoAlfajor);
        console.log("carrito por primera vez ", carrito);
    }

    localStorage.setItem("carritoEnStorage", JSON.stringify(carrito));
    //let carritoEnLS = JSON.parse(localStorage.getItem("carritoEnStorage"));
    let carritoEnLS = chequearCarritoEnLS();
    dibujarTabla(carritoEnLS);
}

function eliminarDelCarrito(id) {
    console.log("entre en eliminarDelCarrito");
    let carrito = JSON.parse(localStorage.getItem("carritoEnStorage"));
    console.log(`carrito en eliminar storage ${carrito}`);
    // Buscamos el item en el carrito
    let alfajor = carrito.find((alfajor) => alfajor.id === id);
    console.log(`alfajor devuelto en eliminar del carrito: ${alfajor.marca}`);

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
        console.log(`index del alfajor: ${index}`);
        console.log(`Cantidad previa del alfajor: ${carrito[index].cantidad}`);
        console.log(`Objeto del alfajor: ${carrito[index]}`);
        carrito[index].quitarCantidadDelStock();
        carrito[index].actualizarPrecio();
        console.log(
            `El precio del alfajor ${carrito[index].marca} es de ${carrito[index].precioTotal} y su cantidad es ${carrito[index].cantidad}`
        );
    } else {
        // Si queda solo una unidad, se elimina del array
        // Para esto utilizamos el método splice
        // Este método sobreescribe el array original
        // Con alfajor id indicamos el índice del elemento en el array
        // a eliminar. El 1 es la cantidad de elementos a eliminar, es este caso, 1 solo
        carrito.splice(index);

        //console.log("carrito luego de splice", carrito);
        if (carrito.lenght === 0) {
            carrito = [];
        }
    }

    // Una vez hecho eso, actualizamos el carrito en el storage
    // y actualizamos la tabla en el HTML
    localStorage.setItem("carritoEnStorage", carrito);
    let carritoEnStorage = chequearCarritoEnLS();
    dibujarTabla(carritoEnStorage);
}
