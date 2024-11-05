(function() {

    document.addEventListener('DOMContentLoaded', ()=>{
        conectarDB();

        formulario.addEventListener('submit', validarCliente);
    })


    function validarCliente(e) {
        e.preventDefault();

        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if(nombre === '' || email === '' || telefono === '' || empresa === '' ){
            imprimirAlerta('Todos los campos son obligatorios', 'error');
            return;
        }

        // Crear un objeto con la informacion

        const cliente = {
            nombre,
            email,
            telefono,
            empresa,
        }
        cliente.id = Date.now();

        crearNuevoCliente(cliente);

    }

    function crearNuevoCliente(cliente) {
        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm'); //hace las acciones para poder almacener y leer la informacion hacia la base de datos

        objectStore.add(cliente);

        transaction.onerror = ()=>{
            imprimirAlerta('Correo Electronico ya ha sido utilizado', 'error');
        }

        transaction.oncomplete = ()=>{
            imprimirAlerta('Cliente se agregó correctamente');

            setTimeout(()=>{
                window.location.href = 'index.html';
            },1000)
        }

    }
})();
