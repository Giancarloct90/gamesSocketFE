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
    const loadingDiv = div.querySelector('#loadingDiv');
    const notiDivDiv = div.querySelector('#notiDivDiv');
    const closeBtn = div.querySelector('#closeBtn');
    const lblNoti = div.querySelector('#lblNoti');
    const fileTxt = div.querySelector('#fileTxt');
    const imgPreview = div.querySelector('#imgPreview');

    // ADD EVENT LISTNER BUTTON TO CLICK
    btnSaveGame.addEventListener('click', async () => {
        let res = await gameDAO.insertGame(nombre.value, image.files[0]);
        // console.log(res);
        if (!res.ok) {
            return notifier('Error to Insert', 'red');
        }
        tbody.innerHTML = '';
        loadingDiv.style.display = 'block';
        initGames();
        nombre.value = '';
        fileTxt.value = '';
    });

    // TO RENDER GAMES 
    const renderGames = async (games) => {
        // console.log(games);
        let html = '';

        games.map(game => {
            // html = `<tr>`;
            html += `<td class='tdClass'>${game.nombre}</td>`;
            html += `<td><button idGame="${game._id}" id="btnEliminar" mode="A" class="btnDetalle">Ver detalle</button><button mode="D" idGame="${game._id}" id="btnEliminar" class="btnEliminar">Eliminar</button></td>`;
            // html = `<tr>`;

            let tr = document.createElement('tr');
            tr.innerHTML = html;
            tbody.appendChild(tr);
            // console.log(tr);
            html = '';
        });

        loadingDiv.style.display = 'none';
        let btnDeletes = document.querySelectorAll('#btnEliminar');

        // let btnActulizar = document.querySelectorAll('#btnActulizar');
        btnDeletes.forEach(element => {
            element.addEventListener('click', async () => {
                // console.log(element.getAttribute('mode'), element.getAttribute('idGame'));
                if (element.getAttribute('mode') === 'A') {
                    // Actulizar
                    console.log('Actulizar', element.getAttribute('idGame'));
                } else if (element.getAttribute('mode') === 'D') {
                    // DELETE
                    console.log('Borrar', element.getAttribute('idGame'));
                    try {
                        let res = await gameDAO.deleteGame(element.getAttribute('idGame'));
                        if (!res.ok) {
                            return notifier('Error to Delete', 'red');
                        }
                        initGames();
                    } catch (e) {
                        console.log('Error trying to delete a game');
                    }
                }
            });
        });
    }

    // NOTIFY ERROR WHEN DATA FAIL
    const notifier = (msj, color) => {
        loadingDiv.style.background = color
        loadingDiv.style.display = 'none'
        lblNoti.innerHTML = msj;
        notiDivDiv.style.display = 'block';
    }

    // CLOSE SPAN TAG
    closeBtn.addEventListener('click', () => {
        notiDivDiv.style.display = 'none';
    });

    // GET ALL GAMES
    const initGames = async () => {
        tbody.innerHTML = '';
        loadingDiv.style.display = 'block';
        try {
            let res = await gameDAO.getAllGames();
            // console.log(res);
            if (!res.ok) {
                return notifier('Erro Server', 'red');
            }
            notiDivDiv.style.display = 'none';
            await renderGames(res.gameDB);
        } catch (e) {
            console.log('Error trying to get all data HCRTLR');
        }
    }

    // TO PUT NAME IN INPUT TXT FROM FILE INPUT
    image.addEventListener('change', () => {
        // console.log(console.log(image.files));
        // console.log(console.log(image.files.name));
        fileTxt.value = image.value.split("\\").at(-1);
        const [file] = image.files
        imgPreview.src = URL.createObjectURL(file);
    })

    initGames();

    return div;
}