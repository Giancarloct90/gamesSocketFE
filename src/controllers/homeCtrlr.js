import view from '../view/home.html';
import GameDAO from '../model/gameDAO';
const gameDAO = new GameDAO();

export const home = async () => {

    // INIT COMPONENTS
    let div = document.createElement('div');
    div.innerHTML = view;

    // VARIABLES
    const btnSaveGame = div.querySelector('#btnSaveGame');
    const nombre = div.querySelector('#nombre');
    const image = div.querySelector('#iImageForm');
    const tbody = div.querySelector('#tbody');
    const loadingDiv = div.querySelector('#loadingDiv');
    const notiDivDiv = div.querySelector('#notiDivDiv');
    const closeBtn = div.querySelector('#closeBtn');
    const lblNoti = div.querySelector('#lblNoti');
    const fileTxt = div.querySelector('#fileTxt');
    const imgPreview = div.querySelector('#imgPreview');
    const modalUpdate = div.querySelector('#modalUpdate');
    const btnCancelModal = div.querySelector('#btnCancelModal');
    const iImageModal = div.querySelector('#iImageModal');
    const iFileTextModal = div.querySelector('#iFileTextModal');
    const iPreviewImg = div.querySelector('#iPreviewImg');
    const iNAmeModal = div.querySelector('#iNAmeModal');
    const ibtnUpdateModal = div.querySelector('#ibtnUpdateModal');
    const iDivNotyValidate = div.querySelector('#iDivNotyValidate');


    // **********EVENTS LISTNER**********
    // TO SAVE A NEW GAME
    btnSaveGame.addEventListener('click', async () => {
        iDivNotyValidate.style.display = 'none';
        aniMove();
        let res = await gameDAO.insertGame(nombre.value, image.files[0]);
        // console.log(res);
        if (!res.ok) {
            if (res.validate) {
                return notyValidate(res.message);
            }
            return notifier('Error to Insert', 'red');
        }
        // tbody.innerHTML = '';
        // loadingDiv.style.display = 'block';
        await initGames();
        nombre.value = '';
        fileTxt.value = '';
        imgPreview.src = 'http://res.cloudinary.com/ddnzwfrmo/image/upload/v1635884762/bxttupkri7u2nfxzz3oi.png';
    });

    // CANCEL MODAL, CLOSE MODAL
    btnCancelModal.addEventListener('click', () => {
        modalUpdate.style.display = 'none';
        iFileTextModal.value = "";
    });

    // BTN TO UPDATE A GAME
    ibtnUpdateModal.addEventListener('click', async element => {
        // console.log('hello');
        // console.log(ibtnUpdateModal.getAttribute("idGame"));
        try {
            let res = await gameDAO.updateAGame(ibtnUpdateModal.getAttribute("idGame"), iNAmeModal.value, iImageModal.files[0]);
            if (!res.ok) {
                modalUpdate.style.display = 'none';
                return notifier('Error al actulizar', 'red');
            }
            console.log(res);
            modalUpdate.style.display = 'none';
            initGames();
            iFileTextModal.value = "";

        } catch (e) {
            // console.log(e);
            modalUpdate.style.display = 'none';
            return notifier('Error al actulizar', 'red');
        }
    });

    // CLOSE SPAN TAG NOTIFIER
    closeBtn.addEventListener('click', () => {
        notiDivDiv.style.display = 'none';
        initGames();
    });

    // TO PUT NAME IN INPUT TXT FROM FILE INPUT
    image.addEventListener('change', () => {
        iDivNotyValidate.style.display = 'none';
        fileTxt.value = image.value.split("\\").at(-1);
        const [file] = image.files;
        imgPreview.src = URL.createObjectURL(file);
    });

    // IMAGE MODAL
    iImageModal.addEventListener('change', () => {
        iFileTextModal.value = iImageModal.value.split("\\").at(-1);
        const [file] = iImageModal.files;
        iPreviewImg.src = URL.createObjectURL(file);
    });

    // **********************************

    // **********FUNCTIONS****************
    // NOTYVALIDATE
    const notyValidate = async (message) => {
        console.log(message);
        iDivNotyValidate.innerHTML = '';
        for (let index = 0; index < message.length; index++) {
            let li = document.createElement('li');
            li.innerHTML = message[index];
            iDivNotyValidate.appendChild(li);
        }

        iDivNotyValidate.style.display = 'block';
        await initGames();
    }

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

        // BTN UPDATE AND DELETE
        btnDeletes.forEach(element => {
            element.addEventListener('click', async () => {

                // UPDATE
                if (element.getAttribute('mode') === 'A') {
                    console.log('Actulizar', element.getAttribute('idGame'));

                    let oneGame = await gameDAO.getOneGame(element.getAttribute('idGame'));
                    // console.log(oneGame);
                    if (!oneGame.ok) {
                        return console.log(oneGame.message);
                    }

                    showModal(oneGame.gamesDB);

                    // DELETE FUNCTION
                } else if (element.getAttribute('mode') === 'D') {
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

    // SHOW MODAL 
    const showModal = (game) => {
        modalUpdate.style.display = 'block';
        console.log('modal', game);
        ibtnUpdateModal.setAttribute("idGame", game._id);
        iNAmeModal.value = game.nombre;
        iPreviewImg.src = game.imagen;
    }

    // NOTIFY ERROR WHEN DATA FAIL
    const notifier = (msj, color) => {
        tbody.innerHTML = '';
        loadingDiv.style.background = color
        loadingDiv.style.display = 'none'
        lblNoti.innerHTML = msj;
        notiDivDiv.style.display = 'block';

    }

    // INIT ANIMATION 
    const aniMove = async () => {
        tbody.innerHTML = '';
        loadingDiv.style.display = 'block';
    }

    // GET ALL GAMES
    const initGames = async () => {
        aniMove();
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

    // **********************************

    // INIT ALL
    initGames();

    return div;
}