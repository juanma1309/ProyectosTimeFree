const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', ()=> {
    formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e) {
    e.preventDefault();

    // Validar

    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === ''){
        limpiarHTML();

        mostrarError('Ambos campos son obligatorios');
        return;
    }

    //construimos la API
    consultarAPI(ciudad, pais);

}


function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100');
    
    if(!alerta){
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
        <strong class = "font-bold"> Error! </strong>
        <span class="block"> ${mensaje} </span>
        `;

        container.appendChild(alerta);
        
        setTimeout(() => {
            alerta.remove();
        }, 1500);
    }
}

function consultarAPI(ciudad, pais) {
    
    const appID = '66a1c039e287f7d6e974e02878937384';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;

    Spinner(); //muestra un Spinner de carga

    fetch(url)
        .then( respuesta => respuesta.json() )
        .then( datos => {
            
            limpiarHTML();

            if(datos.cod === "404"){
                mostrarError('Ciudad no encontrada');
                return;
            }

            // imprime la respuesta en el html
            mostrarClima(datos);
        });
}

function mostrarClima(datos) {
    const {name, main:{temp, temp_max, temp_min}} = datos;

    const centigrados = kelvinAcentigrados(temp);
    const max = kelvinAcentigrados(temp_max);
    const min = kelvinAcentigrados(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en: ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    const tempMax = document.createElement('p');
    tempMax.innerHTML = `Max: ${max} &#8451;`;
    tempMax.classList.add('font-bold', 'text-xl');

    const tempMin = document.createElement('p');
    tempMin.innerHTML = `Min: ${min} &#8451;`;
    tempMin.classList.add('font-bold', 'text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(tempMin);

    resultado.appendChild(resultadoDiv);

}

const kelvinAcentigrados = grados => parseInt(grados - 273.15);

function limpiarHTML() {
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner() {

    limpiarHTML();

    const divSpiner = document.createElement('div');
    divSpiner.classList.add('spinner');

    divSpiner.innerHTML = `
    <div class="cube1"></div>
    <div class="cube2"></div>  
    `;

    resultado.appendChild(divSpiner);

}