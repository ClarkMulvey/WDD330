
// Putting this at the top will make sure that this file is run in strict mode
'use strict';

// the following statement causes an errro
//e = 2.81828;

// by function strict mode
function strictly() {
    'use strict';

}

// we don't know if this object exists, so make sure it does before we activate it
if (window.holoDeck) {
    virtualReality.activate();
}


//======================Debugging==========================
// Very cool - this will automatically set breakpoints anywhere the debugger statement is
function amIOldEnough(age){
    debugger;
        if (age < 12) {
        debugger;
        return 'No, sorry.';
        } else if (age < 18) {
        debugger;
        return 'Only if you are accompanied by an adult.';
        } else {
        debugger;
        return 'Yep, come on in!';
    }
}

// ================== Throwing Exceptions ==============
function squareRoot(number) {
    'use strict';
    if (number < 0) {
        throw new RangeError('You cannot find the square root of negative numbers');
    }
    return Math.sqrt(number);
};


/// Try catch block:
// catch only runs if there is an exception thrown
// finally runs regardless if there is or is not an exception thrown
function imaginarySquareRoot(number) {
    'use strict';
    let answer;
    try {
        answer = String(squareRoot(number));
    } catch(error) {
        answer = squareRoot(-number)+"i";
    } finally {
        return `+ or - ${answer}`;
    }
}