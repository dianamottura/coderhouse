class Pelicula {
    constructor(nombre, duracion, genero) {
        this.nombre = nombre;
        this.duracion = duracion;
        this.genero = genero;
    }
}

// Validación para cargar un array tomando los datos almacenados en el LS
// Si no hay nada, devuelve un array vacío
// Esto lo pueden adaptar a su carrito de compras
// en donde esta función se llamaría, por ej, "cargarCarrito"
function cargarListado() {
    let listadoPeliculas = JSON.parse(localStorage.getItem("listadoPeliculas"));
    if (listadoPeliculas == null) {
        return [];
    }
    return listadoPeliculas;
}

//  Funcion para guardar el array en localStorage
// function guardarListado(listadoPeliculas) {
//     localStorage.setItem("listadoPeliculas", JSON.stringify(listadoPeliculas));
//     mostrarListado(listadoPeliculas);
// }

//  Funcion para guardar pelicula
// Obtiene los datos ingresados en el form accediento al value de los inputs
function guardarPelicula(e) {
    e.preventDefault();
    // querySelector es un "resumen" de getElementById, getElementsByClassName, etc
    // donde para indicar si nos referimos a un id o a una clase
    // lo llamamos como en css:
    // "#soyUnId"
    // ".soyUnaClass"
    let nombre = document.querySelector("#nombre").value;
    let duracion = document.querySelector("#duracion").value;
    let genero = document.querySelector("#genero").value;

    // Esta función recupera el array guardado en el LS
    // validando que en caso de no contener nada, devuelva un array vacío
    let listadoPeliculas = cargarListado();

    // Se agrega la película nueva al array
    listadoPeliculas.push(new Pelicula(nombre, duracion, genero));

    // Actualizamos el LS y mostramos el listado de pelis
    localStorage.setItem("listadoPeliculas", JSON.stringify(listadoPeliculas));
    mostrarListado(listadoPeliculas);

    // Limpia el texto ingresado en el form (método reset())
    document.getElementById("formularioPeliculas").reset();
}

// Funcion para armar una tarjeta desde el DOM/JS
// Creamos el div con el contenido de las tarjetas a imprimir
// Será llamada a la hora de recorrer el array, generando una card
// con el contenido de cada índice del array
function armarTarjeta(elemento) {
    // Creamos el div de la tarjeta, el cual contendrá todos
    // los elementos creados a continuación
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");

    // Se crea un título y se agrega al div contenedor tarjeta
    // Lo mismo es para Duración y Género
    const nombrePelicula = document.createElement("h3");
    nombrePelicula.textContent = `${elemento.nombre}`;
    tarjeta.appendChild(nombrePelicula);

    const duracion = document.createElement("div");
    duracion.textContent = `Duracion: ${elemento.duracion}`;
    tarjeta.appendChild(duracion);

    const genero = document.createElement("div");
    genero.textContent = `Genero: ${elemento.genero}`;
    tarjeta.appendChild(genero);

    // Creación del botón
    const boton = document.createElement("input");
    boton.type = "button";

    // Es importante asignarle el id con algún dato único de la card a generar
    // Aquí tomé el nombre de la peli ya que no hice ids numéricos
    boton.id = `${elemento.nombre}`;
    boton.value = "Guardar en favoritos";

    // En lugar de ese console.log debería estar una función que agregue
    // el elemento seleccionado a un nuevo array
    // Para los que están con carritos de compras:
    // se agregaría el elemento al carrito
    // se actualiza el LS
    // se imprime el carrito
    boton.addEventListener("click", mostrarEnFavoritos);

    // También agregamos el botón a la tarjeta
    tarjeta.appendChild(boton);

    return tarjeta;
}

function mostrarEnFavoritos(e) {
    // Simulación
    console.log(`Se agregó ${e.target.id} al listado de Favoritos`);
}

function mostrarListado(listadoPeliculas) {
    // Obtenemos el id del contenedor del listado de pelis
    let listado = document.getElementById("listado");

    // Nos aseguramos de que el contenido del listado esté vacío
    // para evitar duplicación de elementos
    // Pueden probar comentando esta línea (113) y ver qué pasa
    // Cada vez que agreguen pelis nuevas
    listado.textContent = "";

    // Recorremos todo el array agregando cada tarjeta generada
    // en el contenedor del listado
    listadoPeliculas.forEach((elemento) => {
        listado.appendChild(armarTarjeta(elemento));
    });
}

//  Funcion asociada a evento para cambiar tema a darkMode
// (chequear "darkMode" en el css)
function cambiarTema() {
    document.body.classList.toggle("darkMode");
}

//  Funcion asociada a evento para mostrar menu peliculas
// (chequear clase "oculto" en el css)
function mostrarFormulario() {
    document.getElementById("menuAgregar").classList.toggle("oculto");
}

//  Evento para dark mode.
// Obtiene el id del botón desde el html y le asigna el evento click
let botonDarkMode = document.getElementById("darkMode");
botonDarkMode.addEventListener("click", cambiarTema);

//  Evento para mostrar menu peliculas
let mostrarMenu = document.getElementById("mostrarMenu");
mostrarMenu.addEventListener("click", mostrarFormulario);

//  Evento para guardar formulario pelicula
let formulario = document.getElementById("formularioPeliculas");
formulario.addEventListener("submit", guardarPelicula);

// Invocamos a la función para que se muestre el listado de pelis
// apenas abrimos el html
// Si no hay pelis cargadas en el LS no mostrará nada
mostrarListado(cargarListado());
