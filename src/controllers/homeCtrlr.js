import view from '../view/home.html';
import GameDAO from '../model/gameDAO';
const gameDAO = new GameDAO();

export const home = async () => {

    // INIT COMPONENTS
    let div = document.createElement('div');
    div.innerHTML = view;
    const btnSaveGame = div.querySelector('#btnSaveGame');
    // VARIABLES
    const nombre = div.querySelector('#nombre');
    const image = div.querySelector('#image');
    const tbody = div.querySelector('#tbody');

    // console.log(view);

    // ADD EVENT LISTNER BUTTON TO CLICK
    btnSaveGame.addEventListener('click', async () => {
        let res = await gameDAO.insertGame(nombre.value, image.files[0]);
        console.log(res);
    });

    // TO RENDER GAMES 
    const renderGames = async (games) => {
        // console.log(games);
        let html = '';
        games.map(game => {
            // html = `<tr>`;
            html += `<td>${game.nombre}</td>`;
            html += `<td>Actulizar/Borrar</td>`;
            // html = `<tr>`;
            let tr = document.createElement('tr');
            tr.innerHTML = html;
            tbody.appendChild(tr);
            console.log(tr);
            html = '';
        });
        //<tr>
        //<td>hello</td>
        // <td>Actulizar/Borrar</td>
        // </tr>
    }

    // GET ALL GAMES
    try {
        let res = await gameDAO.getAllGames();
        console.log(res);
        renderGames(res.gameDB);
    } catch (e) {
        console.log('Error trying to get all data');
    }

    return div;
}