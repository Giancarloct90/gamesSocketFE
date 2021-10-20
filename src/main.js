import './style/style.css'

import {
    routes
} from './routes/routes';
import './index';
import './style/style.css'

routes(window.location.hash);
window.addEventListener('hashchange', async () => {
    routes(window.location.hash);
});