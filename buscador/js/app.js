// Variable

const resultado = document.querySelector('#resultado');
const year = document.querySelector('#year');
const marca = document.querySelector('#marca');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

const max = new Date().getFullYear();  //Obtener año acual
const min = max - 10;

// Generar un objeto con la busqueda

const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}

// Evento

document.addEventListener('DOMContentLoaded', () =>{
    mostrarAutos(autos); //Muestras los automoviles al cargar

    // Llena las opciones de año
    llenarSelect();

});

// Generar listener para los select de busqueda
marca.addEventListener('change', e =>{
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
});

year.addEventListener('change', e => {
    datosBusqueda.year = e.target.value;
    filtrarAuto();
});

minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value;
    filtrarAuto();
});

maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
});

puertas.addEventListener('change', e => {
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();

});

transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
});

color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;
    filtrarAuto();
});

// Funciones

function mostrarAutos(autos){
    limpiarHTML();
    autos.forEach(auto => {
        const{marca, modelo, year, precio, puertas, color, transmision} = auto; //Esto se le llama Destructuring
        const autoHTML = document.createElement('p');

        autoHTML.textContent = `
            ${marca} , ${modelo} - ${year} - ${puertas} Puertas - Transmicion: ${transmision} - Precio: ${precio} - Color: ${color}
        `;

        //Insertar en el HTML

        resultado.appendChild(autoHTML);

    });
}

//Limpiar HTML

function limpiarHTML(){  
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

// Generar los años del select

function llenarSelect(){
    for( let i = max; i >= min; i--){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); //Agrega las opciones de año al select
    }
}



// funcion que filtra en base a la busqueda

function filtrarAuto(){
     // funcion de alto nivel - se llama asi porque es una funcion dentro de otra funcion
    // Filter tambien funciona como chain/cadena

    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor)
    if(resultado.length){
        mostrarAutos(resultado);
    }else{
        noResultado();
    }
};

function noResultado(){
    limpiarHTML();

    const noResultado= document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent =  'No hay resultados, Intenta con otros termino de busqueda';
    resultado.appendChild(noResultado);
}

function filtrarMarca(auto){
    const {marca} = datosBusqueda;
    if(marca){
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto){
    const {year} = datosBusqueda;
    if(year){
        return auto.year === parseInt(year);
    }
    return auto;
}

function filtrarMinimo(auto){
    const {minimo} = datosBusqueda;
    if(minimo){
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto){
    const {maximo} = datosBusqueda;
    if(maximo){
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas (auto){
    const {puertas} = datosBusqueda;
    if(puertas){
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarTransmision(auto){
    const {transmision} = datosBusqueda;
    if(transmision){
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto){
    const {color} = datosBusqueda;
    if(color){
        return auto.color === color;
    }
    return auto;
}