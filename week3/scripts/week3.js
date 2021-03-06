let linksList = document.querySelector('#links');

const linksListItems =  [
    {
        label: "Chapter 7",
        url: "Ch7/events.html"
    },
    {
        label: "Build a Table Challenge",
        url: "codeChallenges/BuildATable.html"
    },
    {
        label: "Elements by Tag Name Challenge",
        url: "codeChallenges/ElementsByTagName.html"
    },
    {
        label: "Team Activity",
        url: "teamActivity/index.html"
    }
]

linksListItems.forEach(
    link => {
        linksList.innerHTML += 
        `<li><a href="${link.url}">${link.label}</a></li>`;
    }
);



////#############READING NOTES####################
// From THIS article
function makeUser() {
    return {
        name: "John",
        ref() {
            return this;
        }
    }
}   

let user = makeUser();

console.log(user.ref().name);
//Note the following will never work:
// console.log(user.this.name); if we just had a ref: this property instead of the method
// This is because 'this' is assigned at compliation - and it needs to be called as an object method


/*Is it dangerous to use a method to create and set a member variable?
When is it a good idea to have a method create a variable, rather than creating it at 
object declaration?*/
calculator = {
    read() {
        this.valueOne = prompt("gimme a value");
        this.valueTwo = prompt("gimme another value");
    },
    sum() {
        return parseFloat(this.valueOne) + parseFloat(this.valueTwo);
    },
    mul() {
        return parseFloat(this.valueOne) * parseFloat(this.valueTwo);
    }
}


// if we return this, we can chain our methods
let ladder = {
    step : 0,
    up() {
        this.step++;
        return this;
    },
    down() {
        this.step--;
        return this;
    },
    showStep : function() {
        alert(this.step);
        return this;
    }
}


//==========CH5 Objects==========
function greet({greeting,name,age}) {
    return `${greeting}! My name is ${name} and I am ${age} years old.`;
}

function greet({greeting='Hello',name,age=18}) {
    return `${greeting}! My name is ${name} and I am ${age} years old.`;
}

let pattern = /[a-zA-Z]+ing$/;

pattern = new RegExp('[a-zA-Z]+ing');

const language = 'JavaScript';
pattern = new RegExp(language);




//===========================================================================
//==========================================================================

//const firstName = 'Clark';
//const lastName = 'Mulvey';

const students = [
    {
        firstName : "Clark",
        lastName : "Mulvey",
        age: 25,
        hobbies : [
            'Programming',
            'Reading',
            'Camping'
        ],
        book : [
            {
                title: 'Programming with C#',
                author: 'Uncle Bob'    
            }
        ]
    },
    {
        firstName : "Laura",
        lastName : "Mulvey",
        age: 23,
        hobbies : [
            'Sleeping',
            'Whining',
            'Farting'
        ],
        book : [
            {
                title: 'HypnoBabies',
                author: 'Marie Kondo'    
            }
        ]
    }
];

console.log(students);

students[0].iNumber = '11222223333';

console.log(students);

const section = document.querySelector('#section1');

const output = `<div>`; // can do this way

const div1 = document.createElement('div');
div1.setAttribute("id", "div1");
div1.classList.add('emphasize');
// Doesn't work
// div1.textContent = "<em>" + firstName + "</em>";
// Instead use:
// div1.innerHTML = "<em>" + firstName + "</em>";
div1.textContent = students[0].firstName;


section.appendChild(div1);

const div2 = document.createElement('div');
div2.textContent = students[0].lastName;

section.appendChild(div2);

const div3 = document.createElement('div');
//div3.textContent = students[0].hobbies.join(', ');



const ul = document.createElement('ul');
students[0].hobbies.forEach(
    hobby=> {
        //const li = document.createElement('li');
        //li.textContent = hobby;
        //li.addEventListener('click',
        //    () => {

        //    });
        //ul.appendChild(li);
        // OR
        ul.innerHTML += 
            `<li>${hobby}</li>`;
    }
);

div3.innerHTML += `<h3>Hobbies</h3>`;

div3.appendChild(ul);

section.appendChild(div3);


/* Hikes */

/*
//create an array of hikes
const hikeList = [
{
    name: 'Bechler Falls',
    imgSrc: 'falls.jpg',
    imgAlt: 'Image of Bechler Falls',
    distance: '3 miles',
    difficulty: 'Easy',
    description:
    'Beautiful short hike along the Bechler river to Bechler Falls',
    directions:
    'Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead.'
},
{
    name: 'Teton Canyon',
    imgSrc: 'falls.jpg',
    imgAlt: 'Image of Teton Canyon',
    distance: '5 miles',
    difficulty: 'Moderate',
    description: 'Beautiful short hike up Teton Canyon',
    directions:
    'Take Highway 33 to Driggs. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead.'
},
{
    name: 'Denanda Falls',
    imgSrc: 'falls.jpg',
    imgAlt: 'Image of Denanda Falls',
    distance: '12 miles',
    difficulty: 'Moderate',
    description:
    'Beautiful short hike through Bechler Meadows to Denanda Falls',
    directions:
    'Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to the end of the Cave Falls road. There is a parking area at the trailhead.'
}
];

const section2 = document.querySelector('#section2');
hikeList.forEach(
    hike => {
        // create article
        const article = document.createElement('article');

        // create h1/setcontent/append to article
        const h1 = document.createElement('h1');
        h1.textContent = hike.name;
        article.appendChild(h1);

        // create img
        const img = document.createElement('img');
        img.setAttribute('src', 'images/' + hike.imgSrc);
        img.setAttribute('alt', hike.imgAlt);
        article.appendChild(img);

        // append article to #section2
        section2.appendChild(article);

    }
);


//create an array of hikes
const vacationList = [
    {
        name: 'Grand Cayman',
        description:
        'Honeymoon!',
        date: 'March/April 2017',
        imgMap : '',
        imgMapAlt: '',
        highlights: [
            {
                name: 'Bechler Falls',
                imgSrc: 'falls.jpg',
                imgAlt: 'Image of Bechler Falls',
                description: 'Beautiful short hike along the Bechler river to Bechler Falls',

            }
        ],

    },
    {
        name: 'China',
        description:
        'One Year Anniversary!',
        date: 'March/April 2018',
        imgMap : '',
        imgMapAlt: '',
        highlights: [
            {
                name: 'Bechler Falls',
                imgSrc: 'falls.jpg',
                imgAlt: 'Image of Bechler Falls',
                description: 'Beautiful short hike along the Bechler river to Bechler Falls',

            }
        ],
    },
    {
        name: 'Ireland',
        description:
        'Beautiful short hike along the Bechler river to Bechler Falls',
        date: 'Feb, 2019',
        imgMap : '',
        imgMapAlt: '',
        highlights: [
            {
                name: 'Bechler Falls',
                imgSrc: 'falls.jpg',
                imgAlt: 'Image of Bechler Falls',
                description: 'Beautiful short hike along the Bechler river to Bechler Falls',

            }
        ],
    },
    {
        name: 'Amsterdam',
        description:
        'Beautiful short hike along the Bechler river to Bechler Falls',
        date: 'Feb, 2019',
        imgMap : '',
        imgMapAlt: '',
        highlights: [
            {
                name: 'Bechler Falls',
                imgSrc: 'falls.jpg',
                imgAlt: 'Image of Bechler Falls',
                description: 'Beautiful short hike along the Bechler river to Bechler Falls',

            }
        ],
    },
    {
        name: 'Juneau',
        description:
        'Beautiful short hike along the Bechler river to Bechler Falls',
        date: '2015-2019',
        imgMap : '',
        imgMapAlt: '',
        highlights: [
            {
                name: 'Bechler Falls',
                imgSrc: 'falls.jpg',
                imgAlt: 'Image of Bechler Falls',
                description: 'Beautiful short hike along the Bechler river to Bechler Falls',

            }
        ],
    }
];

const section3 = document.querySelector('#section3');
hikeList.forEach(
    hike => {
        // create article
        const article = document.createElement('article');

        // create h1/setcontent/append to article
        const h1 = document.createElement('h1');
        h1.textContent = hike.name;
        article.appendChild(h1);

        // create img
        const img = document.createElement('img');
        img.setAttribute('src', 'images/' + hike.imgSrc);
        img.setAttribute('alt', hike.imgAlt);
        article.appendChild(img);

        // append article to #section2
        section2.appendChild(article);

    }
);*/