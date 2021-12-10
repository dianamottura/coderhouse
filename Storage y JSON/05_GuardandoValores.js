const consultarIngresoDeProdcuto = () => prompt('¿Desea ingresar un producto? Y/N ').toUpperCase() === 'Y';

const cargarProductos = (empresa) => {
    while (consultarIngresoDeProdcuto()) {
        const producto = new Producto(prompt('Codigo'),prompt('Nombre'),parseFloat(prompt('Peso')));
        alert(empresa.agregarProducto(producto));
    }
}

class Producto {
    constructor(codigo, nombre, peso) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.peso = peso;
    }
}

class Empresa {
    constructor(nombre) {
        this.nombre = nombre;
    }

    agregarProducto(producto) {
        if (this.productos.find(item => item.codigo == producto.codigo)) {
            return 'Producto ya existe'
        } else {
            this.productos.push(producto);
            return 'Producto agregado';
        }
    }

    actualizarDeposito() {
        localStorage.setItem(`${this.nombre}`, JSON.stringify(this.productos));
    }

    cargarDeposito() {
        const deposito = JSON.parse(localStorage.getItem(`${this.nombre}`));
        if (deposito) {
            this.productos = deposito;
        } else {
            this.productos = [];
        }
        //  this.productos = deposito ? deposito : [];
    }
}

//  Aqui comienza

const empresa = new Empresa(prompt("Nombre Empresa"));
empresa.cargarDeposito();
cargarProductos(empresa);
empresa.actualizarDeposito();