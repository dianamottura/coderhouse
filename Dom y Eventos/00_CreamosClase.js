function crearTarjetaFavoritos(elemento) {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjetaFavs");

    const nombrePelicula = document.createElement("h3");
    nombrePelicula.textContent = `${elemento.nombre}`;
    tarjeta.appendChild(nombrePelicula);

    const duracion = document.createElement("p");
    duracion.textContent = `Duracion: ${elemento.duracion}`;
    tarjeta.appendChild(duracion);

    const genero = document.createElement("p");
    genero.textContent = `Genero: ${elemento.genero}`;
    tarjeta.appendChild(genero);

    return tarjeta;
}
