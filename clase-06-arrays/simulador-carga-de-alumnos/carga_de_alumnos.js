class Alumno {
    constructor(nombre_recibido, dni_recibido, carrera_recibida, nota1, nota2) {
        this.nombre = nombre_recibido;
        this.dni = parseInt(dni_recibido);
        this.carrera = carrera_recibida;
        this.nota1 = parseInt(nota1);
        this.nota2 = parseInt(nota2);
        this.promedio;
    }

    imprimirAlumno() {
        return `Alumno: ${this.nombre} DNI: ${this.dni} Carrera: ${this.carrera}`;
    }

    obtenerPromedio() {
        return (this.promedio = (this.nota1 + this.nota2) / 2);
    }
}

/* ---------- Aquí inicializamos vacío el array a utilizar ----- */
let alumnos = [];

/* --- Instanciar objeto con una función --- */
function crearAlumno() {
    const nombre = prompt("Ingresa el nombre");
    const dni = prompt("Ingresa el dni");
    const carrera = prompt("Ingresa la carrera");
    const nota1 = prompt("Ingresa la primera nota");
    const nota2 = prompt("Ingresa la segunda nota");

    return new Alumno(nombre, dni, carrera, nota1, nota2);
}

// Simular un menú de carga de alumnos
let continuar = confirm("Desea cargar alumnos?");
while (continuar) {
    let alumno = crearAlumno();
    console.log("Datos del alumno: ", alumno.imprimirAlumno());
    alumnos.push(alumno);

    continuar = confirm("Desea cargar alumnos?");
}

console.table(alumnos);
