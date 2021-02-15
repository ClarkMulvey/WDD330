import {
    Game
} from './game.js';

const game = new Game();


const div1 = document.querySelector('#div1');
div1.innerHTML = 'yessir';


const tbody = document.querySelector('tbody');
tbody.innerHTML = game.drawBoard();



cell0 {
    htmlRef : "yes",
    model : 12
};

var car = {type:"Fiat", model:"500", color:"white"};