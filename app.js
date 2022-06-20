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
    nuevoGasto(gasto){
        this.gastos = [...this.gastos, gasto];
        console.log(this.gastos);
    }
}

class UI {
    insertarPresupuesto(cantidad){
        const {presupuesto, restante} = cantidad;
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    imprimirAlerta(mensaje, tipo){
        const divMensaje = document.createElement('div');
        if(tipo === 'error'){
            divMensaje.style.cssText = `
            background-color: red; 
            color: white; 
            width: 280px;
            margin: auto;
            text-align: center;
            `;
        } else {
            divMensaje.style.cssText = `
            background-color: green; 
            color: white; 
            width: 280px;
            margin: auto;
            text-align: center;
            `;
        }

        divMensaje.textContent = mensaje;
        document.querySelector('.container').insertBefore(divMensaje, formulario);

        setTimeout(() => {
            divMensaje.remove();
        }, 3000)
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
    const inputCantidad = Number(document.querySelector('#input_cantidad').value);

    if(inputGasto === '' || inputCantidad === ''){
        ui.imprimirAlerta('Ambos campos son obligatorios','error');
        return;
    } else if(inputCantidad <= 0 || isNaN(inputCantidad)){
        ui.imprimirAlerta('Cantidad no válida','error');
        return;
    } else {
        ui.imprimirAlerta('Agregando gasto');
    }
    // Generar un objeto con el nuevo gasto
    const gasto = {inputGasto, inputCantidad, id: Date.now()};
    presupuesto.nuevoGasto(gasto);//Añade nuevo gasto
    //Reinicia formulario
    formulario.reset();
}