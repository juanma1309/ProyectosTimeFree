//Variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');


// Eventos

eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

    formulario.addEventListener('submit', agregarGasto);
}


// Clases

class Presupuesto{

    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }
    nuevoGasto(gasto){
        this.gastos = [...this.gastos, gasto];
        this.calcularRestante();
    }

    calcularRestante(){
        const gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
        this.restante = this.presupuesto  - gastado;
    }

    eliminarGasto(id){
        this.gastos = this.gastos.filter(gasto => gasto.id !== id);
        this.calcularRestante();
    }


}

class UI {
    insertarPresupuesto(cantidad){
        const { presupuesto, restante} = cantidad;
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    imprimirAlerta(mensaje, tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        divMensaje.textContent = mensaje;
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        setTimeout(()=>{
            divMensaje.remove();
        },2000)
    }

    agregarGastoListado(gastos){
    
        this.limpiarHTML();
        // Iterar sobre los gastos
        gastos.forEach( gasto => {
            const {cantidad, nombre, id} = gasto;

            // Crear un LI

            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id;

            // Agregar el HTML gasto
            nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill"> $ ${cantidad} </span>`;
            // boton para borrar el gasto

            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.innerHTML = 'Borrar &times';
            btnBorrar.onclick = ()=>{
                eliminarGasto(id);
            }
            nuevoGasto.appendChild(btnBorrar);

            // agregar el HTML

            gastoListado.appendChild(nuevoGasto);


        });
    }

    limpiarHTML(){
        while(gastoListado.firstChild){
            gastoListado.removeChild(gastoListado.firstChild);
        }
    }

    gastoRestante(restante){
        document.querySelector('#restante').textContent = restante;

    }

    comprobarPresupuest(presupuestoObj){
        const { presupuesto, restante} = presupuestoObj;
        const restanteDiv = document.querySelector('.restante');
        //Comprobar 25%
        if((presupuesto / 4) >= restante){
            restanteDiv.classList.remove('alert-success', 'alert-warning');
            restanteDiv.classList.add('alert-danger');
        }else if((presupuesto / 2) >= restante){
            restanteDiv.classList.remove('alert-success', );
            restanteDiv.classList.add('alert-warning');
        }else{
            restanteDiv.classList.remove('alert-danger', 'alert-warning');
            restanteDiv.classList.add('alert-success');
        }

        if(restante <= 0){
            ui.imprimirAlerta('El presupuesto se ha agotado', 'error');
            formulario.querySelector('button[type="submit"]').disabled = true;
        }else{
            formulario.querySelector('button[type="submit"]').disabled = false;
        }
    }
}

// Instanciar
const ui = new UI();

let presupuesto;

// Funciones

function preguntarPresupuesto(){

    const presupuestoUsurio = prompt('Cual es tu presupuesto');

    // isNaN convierte el String a Number, sin embargo si el dato es una letra isNaN devolvera un boolean, esto porque no es posible convertir una letra a un numero 
    if( preguntarPresupuesto === '' || presupuestoUsurio === null || isNaN(presupuestoUsurio) || presupuestoUsurio <= 0){
        window.location.reload();
    }

    presupuesto = new Presupuesto(presupuestoUsurio);
    ui.insertarPresupuesto(presupuesto)
}


function agregarGasto(e){
    e.preventDefault();

    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    if(nombre === '' || cantidad ===''){
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
        return;
    }else if( cantidad <= 0 || isNaN(cantidad)){
        ui.imprimirAlerta('Cantidad no valida', 'error');
        return;
    }

    // creamos un object literal
    const gasto = {nombre, cantidad, id: Date.now()};
    presupuesto.nuevoGasto(gasto);

    ui.imprimirAlerta('Gasto agregado correctamente');
    
    const {gastos, restante} = presupuesto;
    ui.agregarGastoListado(gastos);
    ui.gastoRestante(restante);
    ui.comprobarPresupuest(presupuesto);

    // Reinicia el formulario
    formulario.reset();
}

function eliminarGasto(id){
    // Elimina del objeto
    presupuesto.eliminarGasto(id);

    // Elimina del HTML
    const {gastos, restante} = presupuesto;
    ui.agregarGastoListado(gastos);
    ui.gastoRestante(restante);
    ui.comprobarPresupuest(presupuesto);
}