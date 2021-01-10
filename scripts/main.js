let ol = document.querySelector('ol');

const links =  [
    {
        label: "Week 1 notes",
        url: "week1/index.html"
    }
]

links.forEach(
    link => {
        ol.innerHTML += 
        `<li><a href="${link.url}">${link.label}</a></li>`;
    }
);


items = document.querySelectorAll('div.ynRLnc');

let appointments = []

items.forEach(
    item => {
        appointments.push(item.innerHTML);
    }
);

let varTwo = []

appointments.forEach(
    item => {
        varTwo.push(
            {
                "Time" : item.split(",")[0],
                "AptTitle" : item.split(",")[1].slice(1)
            }
        );
    }
);