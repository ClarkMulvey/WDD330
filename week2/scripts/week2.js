const templateLiteralDiv = document.querySelector("#templateLiteral");
templateLiteralDiv.innerHTML = `This is a template literal using backticks

I am putting new lines in the string declaration

As you can see the render looks like this`;

console.log(`This is a template literal using backticks

I am putting new lines in the string declaration

As you can see the render looks like this`);

let student = {
    firstName: 'Clark',
    lastName: 'Mulvey',
    iNumber: 123145621
}

//console.dir(student["iNumber"]);

//function declaration
function save1() {
    const name = document.querySelector('#name').value;
    console.log(name);

    const result = document.querySelector('#result');
    result.innerHTML = name;




}

// function expression
const save2 = function() {
    console.log('save2');
}

// arrow function
const save3 = () => {
    console.log('save3');
}

document.querySelector('button').addEventListener('click', save1);


//############# Quiz Ninja Project Chapter 2 #############
const question = "What is Superman's real name?";
const answer = prompt(question);
alert(`You answered ${answer}`);

