import view from '../view/votar.html'
import GameDAO from '../model/gameDAO';
const gameDAO = new GameDAO();
import {
    voted
} from '../index';

export const votar = () => {

    // INIT
    let div = document.createElement('div');
    div.innerHTML = view;

    // VARIABLES
    const cardsDiv = div.querySelector('#cardsDiv');
    const txtIBuscar = div.querySelector('#txtIBuscar');
    let globalGames;

    // FUNCTIONS
    // RENDER GAMES
    const renderGame = async (gamesDBS) => {
        try {
            // cardsDiv.innerHTML = '';
            // let gamesDBS = await init();
            if (!gamesDBS) {
                return console.log('big Error');
            }
            // console.log(gamesDBS);
            // let div = document.createElement('div');
            // div.classList.add('cardDiv');
            let html = '';
            gamesDBS.map(game => {
                let div = document.createElement('div');
                div.classList.add('cardDiv');
                html += `<div class="cardImgVotar">`;
                html += `<img class="img1" src="${game.imagen}" alt="">`;
                html += `</div>`;
                html += `<div class="cardContent">`;
                html += `<h3>${game.nombre}</h3>`;
                html += `<button idGame="${game._id}" class="btnVotar">Votar</button>`;
                html += `</div>`;
                div.innerHTML = html;
                cardsDiv.appendChild(div);
                html = '';
            });
            var allButtonsVotar = cardsDiv.querySelectorAll('button');
            allButtonsVotar.forEach(element => {
                element.addEventListener('click', () => {
                    voted(element.getAttribute('idGame'));
                });
            });
        } catch (e) {
            return console.log('Error Triying to get games RENDERGAMES')
        }
    }

    const findGames = (globalGames) => {
        let gamesFounds = globalGames.filter(game => {
            return game.nombre.toUpperCase().indexOf(txtIBuscar.value.toUpperCase()) !== -1;
        });
        cardsDiv.innerHTML = '';
        // console.log(gamesFounds);
        renderGame(gamesFounds);
    }

    // INIT ALL
    const init = async () => {
        try {
            let res = await gameDAO.getAllGames();
            if (!res.ok) {
                return false;
            }
            globalGames = res.gameDB;
            renderGame(res.gameDB);
        } catch (e) {
            console.log('Error trying to get games INIT');
        }
    }
    init();

    // EVENTS LISTENER
    txtIBuscar.addEventListener('keyup', () => findGames(globalGames));

    return div;
}