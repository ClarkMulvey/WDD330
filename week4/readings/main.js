const form = document.forms.search;
let [input, button] = form.elements;

if (input === form.searchInput) {
    console.log('same');
}

console.log(typeof(input));
console.log(typeof(button));

//input = form.elements.searchInput;

//input.addEventListener('focus', () => alert('focused'));
//input.addEventListener('blur', () => alert('blurred'));
//input.addEventListener('change', () => alert('changed'));

/*
input.value = 'Search Here';

input.addEventListener('focus', () => {
    if (input.value === 'Search Here') {
        input.value = '';
    }
});

input.addEventListener('blur', () => {
    if (input.value === '') {
        input.value = 'Search Here';
    }
});
*/

form.addEventListener ('submit', search);

function search(event) {
    alert(`You searched for: ${input.value}`);
    event.preventDefault();
}


//=================pt 2===================


//same as autofocus
document.forms.hero.heroName.focus();
const form2 = document.forms.hero;
form2.addEventListener("submit", makeHero);

/*
form2.addEventListener ('submit', validate);

function validate(event) {
    const firstLetter = form2.heroName.value[0];
    if (firstLetter.toUpperCase() === 'X') {
        event.preventDefault();
        alert('Your name is not allowed to start with X!');
    }
}*/

document.querySelector('#heroName').addEventListener('keyup', validateInline);

const label = form2.querySelector('label');
const error = document.createElement('div');
error.classList.add('error');
error.textContent = '! Your name is not allowed to start with X.';
label.append(error);

function validateInline() {
    const heroName = this.value.toUpperCase();
    if (heroName.startsWith('X')) {
        error.style.display = 'block';
    } else {
        error.style.display = 'none';
    }
}


function makeHero(event) {
    event.preventDefault();

    const hero = {};

    hero.name = form2.heroName.value;
    hero.realName = form2.realName.value;

    /*
    hero.powers = [];
    for (let i = 0; i < form2.powers.length; i++) {
        if (form2.powers[i].checked) {
            hero.powers.push(form2.powers[i].value);
        }



    }
    */

    console.log(form2.powers);
    console.log([...form2.powers]);
    console.log([...form2.powers].filter(box => box.checked));
    console.log([...form2.powers].filter(box => box.checked).map(box => box.value));

    // or
    hero.powers = [...form2.powers].filter(box => box.checked).map(box => box.value);

    hero.catgeory = form2.category.value;
    hero.age = form2.age.value;
    hero.city = form2.city.value;
    hero.origin = form2.origin.value;

    alert(JSON.stringify(hero));
    return hero;
}

/*
function makeHero(event) {
    event.preventDefault(); // prevent the form from being submitted
    const hero = {}; // create an empty object
    hero.name = form.heroName.value; // create a name property based on the input field's value
    alert(JSON.stringify(hero)); // convert object to JSON string and display in alert dialog
    return hero;
}*/

function disableSubmit(event) {
    if (event.target.value === '') {
        document.getElementById('submit').disabled = true;
    } else {
        document.getElementById('submit').disabled = false;
    }
}

form2.heroName.addEventListener('keyup', disableSubmit);
















