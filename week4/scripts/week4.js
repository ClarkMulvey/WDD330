import {
    Student
} from './student.js';

let linksList = document.querySelector('#links');

const linksListItems =  [
    {
        label: "Chapter 8",
        url: "readings/ch8.html"
    },
]

linksListItems.forEach(
    link => {
        linksList.innerHTML += 
        `<li><a href="${link.url}">${link.label}</a></li>`;
    }
);



const students = [];

const student1 = new Student(
    'Clark',
    'Mulvey',
    '111222233344',
    ['Lord of the rings', 'Harry Potter']
);
const student2 = new Student('Laura', 'Mulvey', '111222233345');
const student3 = new Student('Isaac', 'Mulvey', '111222233346');

students.push(student1);
students.push(student2);
students.push(student3);

console.log(students);

print();

// could use 'submit[type=submit]'
document.querySelector('#submit').addEventListener('click', (event) => {
    event.preventDefault();

    // create a new student
    const newStudent = new Student(
        document.querySelector('#firstName').value,
        document.querySelector('#lastName').value,
        document.querySelector('#iNumber').value
    );

    students.push(newStudent);

    // update student list
    print();

    // clear form fields
    /*
    document.querySelector('#firstName').value = '';
    document.querySelector('#lastName').value = '';
    document.querySelector('#iNumber').value = ''; */
    document.forms[0].reset();
});

function print() {
    const tbody = document.querySelector('tbody');

    tbody.innerHTML = students.map(
        student =>
        `<tr>
                <td>${student.FirstName}</td>
                <td>${student.LastName}</td>
                <td>${student.INumber}</td>
            </tr>`
    ).join('');
}