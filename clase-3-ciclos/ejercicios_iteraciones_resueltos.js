/* El link del after donde explico este código */
// https://drive.google.com/file/d/1BvzgAQ2B7T6_Ro_oM1lTL7xRC2buFxPP/preview

/* Diferencias básicas entre cada ciclo */
// El for se ejecuta las veces que le indiquemos
// El while se ejecuta 0, 1 o más veces
// El do while se ejecuta AL MENOS 1 sola vez (como menciono en el after, no recomiendo el uso de este ciclo)

// Realizar un programa que lea 10 números enteros e informe la suma total de los números leídos.
// Además que informe la cantidad de números mayores a 5.
let sumaTotal = 0;
let mayoresA5 = 0;

for (let i = 1; i <= 10; i++) {
    // sumaTotal = sumaTotal + i;
    sumaTotal += i;
    if (i > 5) {
        // mayoresA5 = mayoresA5 + 1;
        // mayoresA5 += 1;
        mayoresA5++;
    }
}

alert("La suma total es: " + sumaTotal + "\nY la cantidad de numeros mayores a 5 es " + mayoresA5);

// Realizar un programa que lea desde teclado la información de alumnos del curso de Javascript de Coderhouse.
// De cada alumno se lee nombre y nota obtenida en el proyecto final.
// (la nota es un número entre 1 y 10).
// La lectura finaliza cuando el usuario escribe "ESC". Esta entrada no debe procesarse.
// Obtener promedio de las notas del proyecto final.

let sumaNotas = 0;
let cantidadDeNotas = 0;

let nombre = prompt("Nombre o ESC para salir");
let nota = parseInt(prompt("Ingresar nota"));

while (nombre !== "ESC" && nota >= 1 && nota <= 10) {
    sumaNotas += nota;
    cantidadDeNotas++;
    alert("Alumno: " + nombre + " Nota obtenida: " + nota);

    nombre = prompt("Nombre o ESC para salir");
    if (nombre !== "ESC") {
        nota = parseInt(prompt("Ingresar nota"));
    }
}

let promedio = sumaNotas / cantidadDeNotas;
alert("Promedio de " + cantidadDeNotas + " es " + promedio);

// do {
//     let nombreAl = prompt("Nombre");
//     let notaAl = parseInt(prompt("Ingresar nota"));
//     sumaNotas += nota;
// } while (nombre !== "ESC" && nota >= 1 && nota <= 10);

// Realizar un programa que según el clima que haya, le recomiende al usuario con qué salir de la casa.
// Las opciones son fresco, lluvioso y soleado. Sino, enviar el mensaje
// "El tiempo es agradable. ¡Disfrutá del día!"
let clima = prompt("Ingrese el clima del día");
//let clima = "frEsCo";

switch (clima.toLowerCase()) {
    case "fresco":
        alert("Sali con campera");
        break;
    case "lluvioso":
        alert("Sali con paraguas");
        break;
    case "soleado":
        alert("usa protector solar");
        break;
    default:
        alert("El tiempo es agradable. ¡Disfrutá del día!");
        break;
}

// Numeros pares e impares.
// Hacer un programa que itere por los numeros del 0 al 10 y, por cada uno de ellos, imprima el numero y
// nos diga si es par o impar.
// Ejemplo:
// 0 es par
// 1 es impar
// 2 es par
// ...

for (let i = 0; i <= 10; i++) {
    if (i % 2 == 0) {
        console.log("El numero " + i + " es par");
    } else {
        console.log("El numero " + i + "es impar");
    }
}
