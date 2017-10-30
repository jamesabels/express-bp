// import * as TSX from '../../classes/tsx-test';

const dom = document.querySelector('#counter-value');
var counter = 0;

function incrimentCounter () {
    counter++;
    console.log(counter);
    dom.innerHTML = `${counter}`;
}

function decrimentCounter () {
    counter--;
    console.log(counter);
    dom.innerHTML = `${counter}`;
}