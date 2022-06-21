// La idea de interactuar con el HTML es que desde el .js
// podemos obtener elementos del HTML y modificarlos,
// o bien crear elementos nuevos desde el js que se impriman
// en el html

const productos = [
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

function imprimirElementosEnHTML(array) {
    // Obtenemos el contenedor donde almacenaremos
    // los elementos a imprimir en el HTML
    let contenedor = document.getElementById("contenedor");

    // Otra forma
    // let contenedor = document.querySelector("#contenedor");

    for (const elemento of array) {
        // Creamos un nuevo elemento
        // Este div es el que contendra los datos de la card
        // que estaremos creando por cada elemento del array
        // De momento, este div está "flotando en el aire"
        // ya que todavía no lo agregamos al html
        let card = document.createElement("div");

        // Aquí comenzamos a crear el contenido de la card
        // Primero el tipo de etiqueta que queramos usar
        // En este caso, un h2
        let nombre = document.createElement("h2");
        // Con textContent agregamos texto a nuestro h2
        // en este caso, el nombre de la marca del alfajor
        // por ejemplo, el primer elemento contiene "Aguila"
        // como marca. Eso es lo que se imprimirá en el h2
        nombre.textContent = elemento.marca;

        // Una vez que creamos nuestro h2, lo agregamos al div
        // que contendrá los datos de la card
        card.appendChild(nombre);

        // Aquí creamos un tag para la imagen
        // no van a ver nada porque no agregué imágenes en esta carpeta
        let img = document.createElement("img");
        // Con source agregamos la ruta de la imagen
        // el contenido de elemento.img será un string con la ruta.
        // En el caso del primer elemento: "./img/aguilaclasica.jpg"
        // que es lo que está declarado en el array
        img.src = elemento.img;

        // De nuevo, adjuntamos la img al contenido de la card
        card.appendChild(img);

        let precio = document.createElement("p");
        // Aquí usé template strings para que vean que se puede agregar
        // texto junto con el contenido de la variable
        precio.textContent = `Precio ${elemento.precio}`;
        card.appendChild(precio);

        // Una vez que tenemos nuestra card con su contenido dentro
        // Agregamos la card al contenedor que se encuentra en el HTML.
        // Esta acción se realizará para cada elemento del array,
        // devolviéndonos en este caso 6 elementos impresos en el HTML
        contenedor.appendChild(card);
    }
}

function imprimirElementosEnHTML2(array) {
    let contenedor = document.getElementById("contenedor");

    // Esto hace exactamente lo mismo que sucede arriba,
    // pero usando directamente sintaxis de HTML en JS
    // Al contenedor le pasamos innerHTML y dentro
    // lo que queramos agregar, sí o sí con template strings
    // para poder escribir en formato HTML
    for (const elemento of array) {
        // Se creará un div (card) con su contenido para cada elemento
        // del array
        contenedor.innerHTML = `
		<div>
			<h2>${elemento.nombre}</h2>
			<img src="${elemento.img}">
			<p>Precio: ${elemento.precio}</p>
		</div>`;
    }
}

function imprimirDatosTomadosPorPrompt() {
    // Seleccionamos el elemento del html donde vamos a
    // imprimir los datos desde .js
    let carrito = document.querySelector("#carrito");

    let dato = prompt("Qué producto desea comprar?");

    // Una vez que se pide el dato por prompt
    // Creamos, en este caso, un párrafo
    // en el cual su contenido será la variable
    // que contiene el valor ingresado por prompt
    let p = document.createElement("p");
    p.textContent = `Seleccionaste ${dato}`;

    // Mismo procedimiento. Una vez creado el elemento
    // y rellenándolo, lo adjuntamos al div del html
    carrito.appendChild(p);
}

function imprimirDatosTomadosPorPrompt2() {
    let dato = prompt("Qué producto desea comprar?");

    let carrito = document.querySelector("#carrito");
    carrito.innerHTML = `<p>Seleccionaste ${dato}</p>`;
}

imprimirElementosEnHTML(productos);

// setTimeout: Permite elegir en cuánto tiempo se ejecutará
// lo que le pasemos como argumento
// En este caso lo uso para evitar que esta función se ejecute antes
// que la anterior
// El 2do argumento son milisegundos
// 1 segundo = 1000 milisegundos
setTimeout(imprimirDatosTomadosPorPrompt, 500);
