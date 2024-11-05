(function () {

    let idCliente;

    const nombreInput = document.querySelector('#nombre');
    const telefonoInput = document.querySelector('#telefono');
    const emailInput = document.querySelector('#email');
    const empresaInput = document.querySelector('#empresa');

    document.addEventListener('DOMContentLoaded', ()=>{

        conectarDB();

        formulario.addEventListener('submit', actualizarCliente);

        // Verificar el ID de la URL
        const parametrosURL = new URLSearchParams(window.location.search);
        idCliente = parametrosURL.get('id');
        if(idCliente){
            setTimeout(()=>{
                obtenerCliente(idCliente);
            }, 100)
        }
        
    });

    function obtenerCliente(id) {
        
        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');

        const cliente = objectStore.openCursor();
        cliente.onsuccess = function (e){
            const cursor = e.target.result;
            if(cursor){

                if(cursor.value.id === Number(id)){
                    llenarFormulario(cursor.value);                    
                }
                cursor.continue();
            }
        }


    }
    
    function llenarFormulario(datosCliente) {
        const {nombre, email, telefono, empresa} = datosCliente;
        nombreInput.value = nombre;
        emailInput.value = email;
        telefonoInput.value = telefono;
        empresaInput.value = empresa;


    }

    function actualizarCliente(e) {
        
        e.preventDefault();

        if(nombreInput.value === '' || emailInput.value === '' || telefonoInput.value === '' || empresaInput.value === '' ){
            imprimirAlerta('Todos los campos son obligatorios', 'error');
            return;
        }

        // Actualizar Cliente
        const clienteActualizado = {
            nombre: nombreInput.value,
            email: emailInput.value,
            telefono: telefonoInput.value,
            empresa: empresaInput.value,
            id: Number(idCliente),
        };

        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');
        objectStore.put(clienteActualizado);

        transaction.oncomplete = ()=>{
           imprimirAlerta('Editado correctamente');
    
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }
        transaction.onerror = ()=>{
            console.log('hubo un error');
            imprimirAlerta('Hubo un error, verifica que el correo electronico no este en uso', 'error');
        }

    }

})();