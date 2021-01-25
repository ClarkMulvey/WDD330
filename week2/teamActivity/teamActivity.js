const readAndWrite = () => {
    const content = document.querySelector('#inputChallengeOne').value;
    document.querySelector('#divChallengeOne').innerHTML = content;
}

function requirementTwo() {
    const input = document.querySelector('#inputChallengeTwo').value;
    const inputInt = parseInt(input);
    if (inputInt != NaN) {
        document.querySelector('#divChallengeTwo').innerHTML = sumNumbersUpTo(inputInt);
    }
}

function sumNumbersUpTo(num) {
    let value = 0;
    for (let i = 1; i < num + 1; i++) {
        value += i;
    }
    return value;
}

const add = function() {
    const inputOne = document.querySelector('#inputAChallengeThree').value;
    const inputTwo = document.querySelector('#inputBChallengeThree').value;
    document.querySelector('#divChallengeThree').innerHTML = parseFloat(inputOne) + parseFloat(inputTwo);
}

document.querySelector('#buttonChallengeOne').addEventListener('click', readAndWrite);
document.querySelector('#buttonChallengeTwo').addEventListener('click', requirementTwo);
document.querySelector('#buttonChallengeThree').addEventListener('click', add);