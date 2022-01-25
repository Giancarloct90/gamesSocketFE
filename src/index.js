let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

import {
    io
} from "socket.io-client";
import {
    conteo
} from './controllers/conteoCtrlr';

import GameDAO from "./model/gameDAO";
const games = new GameDAO();

// const socket = io("http://localhost:3000");
const socket = io(games.uri);
console.log(games.uri);
const iServerStatus = document.getElementById('iServerStatus');

socket.on('connect', function () {
    iServerStatus.style.background = '#00FF00';
});

socket.on('disconnect', function () {
    iServerStatus.style.background = '#FF033E';
});

export const voted = (id) => {
    console.log(id);
    socket.emit('voted', {
        id
    });
}

socket.on('voted2', async (id) => {
    // let conteo2 = await conteo();
    // let cards = conteo2.querySelector('#cards');
    // console.log(cards.querySelector);
    // let id2 = `#${id}`;
    let element = document.getElementById(`${id.id.id}`);
    element.innerHTML = parseInt(element.innerHTML) + 1;

    // console.log(cards.getElementById(id.id.id));
    // console.log(id.id.id);
    // console.log(document.getElementById(id));
    // console.log(cards.querySelector(id2));

});