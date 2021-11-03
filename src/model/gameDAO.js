export default class GameDAO {
    constructor() {
        this.uri = 'http://localhost:3000/API';
    }

    // TO GET ALL GAMES
    async getAllGames() {
        try {
            let response = await fetch(`${this.uri}/games`);
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
            let response = await fetch(`${this.uri}/games`, {
                method: 'POST',
                body: formData
            });
            let games = await response.json();
            // console.log(games);
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
            let res = await fetch(`${this.uri}/games`, {
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

    // TO GET A GAME 
    async getOneGame(id) {
        try {
            let res = await fetch(`${this.uri}/games/${id}`);
            let response = await res.json();
            return response;
        } catch (e) {
            console.log(e);
            return {
                ok: false,
                message: 'Error to get Game FE',
                e
            }
        }
    }

    // TO UPDATE A GAME
    async updateAGame(id, nombre, image) {
        try {
            let formData = new FormData();
            formData.append("id", "45");
            formData.append("nombre", nombre);
            formData.append('image', image);
            let res = await fetch(`${this.uri}/gamesUpdate`, {
                method: 'POST',
                body: formData
            });
            let response = await res.json();
            return response;
        } catch (e) {
            return {
                ok: false,
                message: 'Error to update a game',
            }
        }
    }
}