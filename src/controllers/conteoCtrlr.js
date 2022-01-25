import view from '../view/conteo.html';
import GameDAO from '../model/gameDAO';
const gameDAO = new GameDAO();

export const conteo = async () => {
    // INIT
    let div = document.createElement('div');
    div.innerHTML = view;

    // VARIABLES 
    var gamesGlobal;
    const cards = div.querySelector('#cards');
    const txtFind2 = div.querySelector('#txtFind2');

    //  FUNCTIONS
    // INIT ALL
    const init = async () => {
        try {
            let res = await gameDAO.getAllGames();
            gamesGlobal = res.gameDB
            renderGame(res.gameDB);
        } catch (e) {
            console.log('Error INIT', e);
        }
    }
    init();

    // RENDER GAMES
    const renderGame = async (games) => {
        let html = '';
        games.map(game => {
            let div = document.createElement('div');
            div.classList.add('card');
            // div.setAttribute('id', game._id);
            html += `<div class="cardImg">`;
            html += `<img src="${game.imagen}" alt="">`;
            html += `</div>`;
            html += `<div class="cardContent">`;
            html += `<h1>${game.nombre}</h1>`;
            html += `<h1>Votos</h1>`;
            html += `<h1 class="h1Votos" id="${game._id}">0</h1>`;
            html += `</div>`;
            div.innerHTML = html;
            cards.appendChild(div);
            html = '';
        });

    }

    // FIND A GAME
    const findAGame2 = (gamesGlobal) => {
        let gameFounds = gamesGlobal.filter(game => {
            return game.nombre.toUpperCase().indexOf(txtFind2.value.toUpperCase()) !== -1;
        });
        cards.innerHTML = '';
        renderGame(gameFounds);
    }

    // ADD EVENT LISTENERS 
    txtFind2.addEventListener('keyup', () => findAGame2(gamesGlobal))

    // END ALL
    return div;
}