//Variables y selectores
const formulario = document.querySelector("#form");
const listadoGasto = document.querySelector("#gastos ul");


// Eventos
eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
    formulario.addEventListener('submit', agregarGasto);
}

// Classes
class Presupuesto {
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }
}

class UI {
    insertarPresupuesto(cantidad){
        const {presupuesto, restante} = cantidad;
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }
}

//Instanciar
const ui = new UI();
let presupuesto;


// Funciones
function preguntarPresupuesto(){
    const presupuestoUsuario = prompt("¿Cuál es tu presupuesto?");

    // console.log(Number(presupuestoUsuario));
    if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0){
        window.location.reload();
    }
    presupuesto = new Presupuesto(presupuestoUsuario);
    console.log(presupuesto);

    ui.insertarPresupuesto(presupuesto);
}

//Agregar gastos
function agregarGasto(e){
    e.preventDefault();

    const inputGasto = document.querySelector('#input_gasto').value;
    const inputCantidad = document.querySelector('#input_cantidad').value;

    if(inputGasto === '' || inputCantidad === ''){
        console.log('Ambos campos son obligatorios');
    }

}