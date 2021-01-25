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
let score = 0;
let quiz = [
    ['What is Superman\'s real name?', 'Clark Kent'],
    ['What is Wonder Woman\'s real name?', 'Diana Prince'],
    ['What is Batman\'s real name?', 'Bruce Wayne']
];

for (const [question, answer] of quiz) {
    const response = prompt(question);
    if (response === answer) {
        alert('Correct!');
        score++;
    } else {
        alert(`Wrong! The correct answer was ${answer}`);
    }
}

alert(`You scored ${score} point${score !== 1 ? 's' : ''}`);



/*
Write a loop that makes seven calls to console.log to output the following triangle:

#
##
###
####
#####
######
#######
*/
function writeTree(numLayers) {
    let myTree = "";
    for (let i = 0; i < numLayers; i++) {
        console.log(myTree += '#');
    }
}

/*
FizzBuzz
Write a program that uses console.log to print all the numbers from 1 to 100, with two exceptions. For numbers divisible by 3, print "Fizz" instead of the number, and for numbers divisible by 5 (and not 3), print "Buzz" instead.

When you have that working, modify your program to print "FizzBuzz" for numbers that are divisible by both 3 and 5 (and still print "Fizz" or "Buzz" for numbers divisible by only one of those).

(This is actually an interview question that has been claimed to weed out a significant percentage of programmer candidates. So if you solved it, your labor market value just went up.)
*/

function fizzBuzz() {
    for (let i = 1; i < 101; i++) {
        let output = "";
        if (i % 3 === 0) {
            output += "Fizz";
        }
        if (i % 5 === 0) {
            output += "Buzz";
        }
        console.log(output || i);
    }
}


/*
Write a program that creates a string that represents an 8×8 grid, using newline characters to separate lines. At each position of the grid there is either a space or a "#" character. The characters should form a chessboard.

Passing this string to console.log should show something like this:

 # # # #
# # # # 
 # # # #
# # # # 
 # # # #
# # # # 
 # # # #
# # # #
When you have a program that generates this pattern, define a binding size = 8 and change the program so that it works for any size, outputting a grid of the given width and height.
*/


let size = 21;

let chessBoard = "";

for (let row = 0; row < size; row++) {
  for (let col = 0; col < size; col++) {
    if ((row + col) % 2 === 0) {
      chessBoard += ' ';
    } else {
      chessBoard += '#';
    }
  }
  chessBoard += '\n';
}

console.log(chessBoard);