
let DB
const form = document.querySelector('#formulario')

    function conectarDB() {
        const abrirConexion = window.indexedDB.open('crm', 1);
        
        abrirConexion.onerror = ()=>{
            console.log('Ha habido un error');
        }

        abrirConexion.onsuccess = ()=>{
            DB = abrirConexion.result;
        }
    }

function imprimirAlerta(mensaje, tipo) {

    const alerta = document.querySelector('.alerta')

        if(!alerta){
        // Crear la alerta
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'border', 'alerta');

        if(tipo === 'error'){
            divMensaje.classList.add('bh-red-100', 'border-red-400', 'text-red-700');
        }else{
            divMensaje.classList.add('bh-green-100', 'border-green-400', 'text-green-700');
        }

        divMensaje.textContent = mensaje;
        form.appendChild(divMensaje);

        setTimeout(()=>{
            divMensaje.remove();
        }, 1500)
    }
}