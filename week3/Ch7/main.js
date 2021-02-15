//function doSomething(event) {
//    console.log(`screen: (${event.screenX},${event.screenY}), page: (${event.pageX},${event.pageY}), client: (${event.screenX},${event.screenY})`);
//}

//addEventListener('click', (event) => console.log(event.type));
//addEventListener('click', doSomething);


const clickParagraph = document.getElementById('click');


clickParagraph.addEventListener('click', () => console.log('click'));
clickParagraph.addEventListener('mousedown', () => console.log('down'));
clickParagraph.addEventListener('mouseup', () => console.log('up'));

const dblclickParagraph = document.getElementById('dblclick');

function highlight(event){
    event.target.classList.toggle('highlight');
}

dblclickParagraph.addEventListener('dblclick', highlight);

const mouseParagraph = document.getElementById('mouse');
mouseParagraph.addEventListener('mouseover', highlight);
mouseParagraph.addEventListener('mouseout', highlight);
mouseParagraph.addEventListener('mousemove', () => console.log('You Moved!'));

addEventListener('keydown', (event) => console.log(`You pressed the ${event.key} character`));

addEventListener('keydown', (event) => {
    if (event.key === 'c' && event.ctrlKey) {
        console.log('Action canceled!');
    }
});

addEventListener('keyup', (event) => console.log(`You stopped pressing the key on ${new Date} `));

addEventListener('keypress', (event) => console.log(`You pressed the ${event.key} character`));

addEventListener('click', (event) => {
    if (event.shiftKey) {
        console.log('A Shifty Click!');
    }
});

addEventListener('touchend', () => console.log('Touch stopped'));

const onceParagraph = document.getElementById('once');
onceParagraph.addEventListener('click', remove);

function remove(event) {
    console.log('Enjoy this while it lasts!');
    onceParagraph.style.backgroundColor = 'pink';
    onceParagraph.removeEventListener('click',remove);
}

const brokenLInk = document.getElementById('broken');

brokenLInk.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('Broken Link!');
});

ulElement = document.getElementById('list');
liElement = document.querySelector('#list li');

ulElement.addEventListener('click', (event) =>
console.log('Clicked on ul'));

ulElement.addEventListener('click', highlight);

liElement.addEventListener('click', (event) => {
    console.log('Clicked on li')
    //event.stopPropagation();
});

