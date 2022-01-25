import {
    components
} from '../controllers/indexCtrlr';

const contentDiv = document.getElementById('contentDiv');

export const routes = async (route) => {
    contentDiv.innerHTML = '';
    switch (route) {
        case '':
            contentDiv.appendChild(await components.home());
            break;
        case '#/':
            contentDiv.appendChild(await components.home());
            break;
            // case '#/Game':
            //     contentDiv.appendChild(await components.game());
            //     break;
        case '#/Votar':
            contentDiv.appendChild(await components.votar());
            break;

        case '#/Conteo':
            contentDiv.appendChild(await components.conteo());
            break;
    }
}