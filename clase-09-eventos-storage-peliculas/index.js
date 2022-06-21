class Pelicula {
    constructor(nombre, duracion, genero) {
        this.nombre = nombre;
        this.duracion = duracion;
        this.genero = genero;
    }
}

// Definición de variables
// Array que contendrá el listado de películas.
// let listadoPeliculas;

// Validación para cargar un array tomando los datos almacenados en el LS
// Si no hay nada, devuelve un array vacío
// Esto lo pueden adaptar a su carrito de compras
// en donde esta función se llamaría, por ej, "cargarCarrito"
function cargarListado() {
    return JSON.parse(localStorage.getItem("listadoPeliculas"));
}

//  Funcion para guardar pelicula
// Obtiene los datos ingresados en el form accediento al value de los inputs
function guardarPelicula(e) {
    e.preventDefault();

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

function mostrarEnFavoritos(pelicula) {
    // Simulación
    console.log(`Se agregó ${pelicula.nombre} al listado de Favoritos`);
}

function mostrarListado(listadoPeliculas) {
    // Obtenemos el id del contenedor del listado de pelis
    let listado = document.getElementById("listado");
    //listado.textContent = "";

    // Recorremos todo el array agregando cada tarjeta generada
    // en el contenedor del listado
    for (const pelicula of listadoPeliculas) {
        let div = document.createElement("div");
        div.innerHTML = `
			<div class="tarjeta">
				<h3>${pelicula.nombre}</h3>
				<p>${pelicula.duracion}<p>
				<p>${pelicula.genero}<p>
				<button id="${pelicula.nombre}" type="button>Guardar en Favoritos</button>
			</div>
		`;

        listado.appendChild(div);
        let boton = document.getElementById(`${pelicula.nombre}`);
        boton.onclick = () => mostrarEnFavoritos(pelicula);
    }
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
botonDarkMode.addEventListener("click", () => cambiarTema(sdfg));

//  Evento para mostrar menu peliculas
let mostrarMenu = document.getElementById("mostrarMenu");
mostrarMenu.addEventListener("click", () => mostrarFormulario());

//  Evento para guardar formulario pelicula
let formulario = document.getElementById("formularioPeliculas");
formulario.addEventListener("submit", guardarPelicula);

// Ejecución del código
let listadoPeliculas = cargarListado();
mostrarListado(listadoPeliculas);
// let array = []
// localStorage.setItem("listadoPeliculas", nombre);

// localStorage.setItem("listadoPeliculas", JSON.stringify(listadoPeliculas));
// array = JSON.parse(localStorage.getItem("listadoPeliculas"));
