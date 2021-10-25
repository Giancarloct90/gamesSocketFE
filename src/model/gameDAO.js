export default class GameDAO {
    constructor() {
        this.uri = 'http://localhost:3000/API/games';
    }

    // TO GET ALL GAMES
    async getAllGames() {
        try {
            let response = await fetch(this.uri);
            let games = await response.json();
            if (!games.ok) {
                return {
                    ok: false,
                    message: 'Error obtener data'
                }
            }
            return games;
        } catch (e) {
            console.log('Error Trying to get all data ', e);
            return {
                ok: false,
                message: 'Error Trying to get all data'
            }
        }
    }

    // TO INSERT A GAME
    async insertGame(nombre, image) {
        let formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('image', image);
        try {
            let response = await fetch(this.uri, {
                method: 'POST',
                body: formData
            });
            let games = await response.json();
            return games;
        } catch (e) {
            console.log('Error insetar juego');
        }
    }

    // TO DELETE A GAME
    async deleteGame(id) {
        let formData = new FormData();
        formData.append('id', id);
        try {
            let res = await fetch(this.uri, {
                method: 'PUT',
                body: formData
            });
            let response = await res.json();
            // console.log(response);
            return response;
        } catch (e) {
            console.log('Error Trying to delete game DAO');
            return false;
        }
    }
}