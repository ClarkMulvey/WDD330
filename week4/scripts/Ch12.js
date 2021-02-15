const dice = {
    sides: 6,
    roll() {
        return Math.floor(this.sides * Math.random() + 1);
    }
}

console.log(dice);

//============Constructor Function===========
// can also be declared:
// function Dice(sides=6) {...

/*
const Dice = function(sides=6) {
    this.sides = sides;
    this.roll = function() {
        return Math.floor(this.sides * Math.random() + 1);
    }
}*/

// Equal to above
// =============== Class Declaration ================
class Dice {
    constructor(sides=6) {
        this.sides = sides;
    }

    roll() {
        return Math.floor(this.sides * Math.random() + 1);
    }
    
    // Static method
    static description() {
        return 'A way of choosing random numbers';
    }
}

//create a new instance of the dice constructor
// NOTE: dont need parenthesis unless providing an argument
const blueDice = new Dice;
const redDice = new Dice(4);
console.log("blueDice: ");
console.log(blueDice);
console.log("redDice: ");
console.log(redDice);

console.log(redDice instanceof Dice);

// Better to use CLASS DECLARATION:
// Using constructor function - noDice is just set to undefined without any warning
//const noDice = Dice();
//noDice
//<< undefined
// Using class - an error is thrown
//const noDice = Dice();
//<< TypeError: Class constructor Dice cannot be invoked without 'new'

// ===================================HOW TO USE COPY CONSTRUCTOR:=============================
// Wrong way = in fact this doesn't work because of references.
const blackDice = redDice;
console.log("blackDice: ");
console.log(blackDice);
blackDice.sides = 20;
console.log("blackDice: ");
console.log(blackDice);
console.log("redDice: ");
console.log(redDice);

// Correct way - must have new keyword
const greenDice = new redDice.constructor(6);
console.log("greenDice: ");
console.log(greenDice);
greenDice.sides = 15;
console.log("redDice: ");
console.log(redDice);

//=========================Static Methods==============
// Called by class itself cannot be called by instances of class
/// see class declaration above to see method:
console.log(Dice.description());

// Does not work 
//greenDice.description();

///======================= Prototype=======================
/*
class Turtle {
    constructor(name, color) {
        this.name = name;
        this.weapon = 'hands';
        let _color = color;
        this.setColor = color => { return _color = color; }
        // another example
        /*
        this.setColor = (color) => {
            if (typeof color === 'string') {
                return _color = color;
            } else {
                throw new Error('Color must be a string!');
            }
        }
        // TODO: SET END OF BLOCK COMMENT
        this.getColor = () => _color;
    }
    sayHi() {
        return `Hi dude, my name is ${this.name}`;
    }
    attack(){
        return `Feel the power of my ${this.weapon}!`;
    }
}
*/

// can add to each instance of the object, and future instances of the object by accessing
// the prototype of the class
//Turtle.prototype.healthPoints = 10;

// Keep in mind all instances of the object will have exactly the same protoype methods and variables
// It's essentially a master prototype for all instances of the same object type

// Okay it appears you cannot change a "own" (not prototyped but set in the object's class itself) variable or method
// From a prototype assignment
// It also appears that if it was FIRST a prototype variable, and then changed from within the instance itself,
//  It cannot be changed from the prototype

// This is what the book says:
/*
When a property or method is called, the JavaScript engine will check to see if an object has its own property or method. If it does, it will use that one; otherwise, it will continue up the prototype chain until it finds a match or reaches the top of the chain.
*/

//===================== INHERITANCE====================
class Turtle {
    constructor(name) {
        this.name = name;
    }
    sayHi() {
        return `Hi dude, my name is ${this.name}`;
    }

    swim() {
        return `${this.name} paddles in the water`;
    }

    toString() {
        return `A turtle called ${this.name}`;
    }
}

class NinjaTurtle extends Turtle {
    constructor(name) {
        super(name);
        this.weapon = 'hands';
    }

    attack() { 
        return `Feel the power of my ${this.weapon}!`;
    }
}



//==============Creating Objects from other Objects===========================
const Human = {
    arms: 2,
    legs: 2,
    walk() {
        console.log('Walking');
    }
}


// Create an instance of this object with the following
const lois = Object.create(Human);

// Can use it as an inheritor of another class
const Superhuman = Object.create(Human);
Superhuman.change = function() {
    return `${this.realName} goes into a phone box and comes out as ${this.name}!`;
};
Superhuman.name = 'Name needed';
Superhuman.realName = 'Real Name Needed';

// create object and set memeber vars
const superman = Object.create(Superhuman);
superman.name = 'Superman';
superman.realName = 'Clark Kent';

// or make a method that can do it for us - it sets init to undefined so can only use once
Superhuman.init = function(name, realName){
    this.name = name;
    this.realName = realName;
    this.init = undefined;
    return this;
}

// Use like this to set vars
const batman = Object.create(Superhuman);
batman.init('Batman', 'Bruce Wayne');

// all in one line because of the return this statement in init
const aquaman = Object.create(Superhuman).init('Aquaman', 'Arthur Curry');


//==================Mixin=======================
const a = {};
const b = {name: 'JavaScript'};

Object.assign(a,b);

a.name;















