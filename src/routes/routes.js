import {
    components
} from '../controllers/indexCtrlr';

const contentDiv = document.getElementById('contentDiv');

export const routes = async (route) => {
    switch (route) {
        case '':
            contentDiv.appendChild(await components.home());
            break;
        case '#/':
            break;
    }
}