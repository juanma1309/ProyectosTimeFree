import * as UI from './interfaz.js';

class API{
    constructor(artista, cancion){
        this.artista = artista;
        this.cancion = cancion;
    }

    consultarAPI(){
        const url = `https://api.lyrics.ovh/v1/${this.artista}/${this.cancion}`;

        fetch(url)
            .then(respuesta => {
                Spinner();
                return  respuesta.json()
            })
            .then(resultado => {

                if(resultado.lyrics){

                    const {lyrics} = resultado;

                    UI.divResultado.textContent = lyrics;
                    UI.headingResultado.textContent = `Letra de la cancion: ${this.cancion} del artista: ${this.artista}`;
                }else{
                    UI.headingResultado.textContent = '';
                    UI.divResultado.textContent = '';
                    UI.divMensajes.textContent = 'La cancion que buscas no existe';
                    UI.divMensajes.classList.add('error');

                    setTimeout(() => {
                        UI.divMensajes.textContent = '';
                        UI.divMensajes.classList.remove('error');
                    }, 1500);
                }
            }
        
            )}
}

function Spinner() {

    const divSpiner = document.createElement('div');
    divSpiner.classList.add('spinner');

    divSpiner.innerHTML = `
    <div class="cube1"></div>
    <div class="cube2"></div>  
    `;

    UI.headingResultado.appendChild(divSpiner);

}

export default API;