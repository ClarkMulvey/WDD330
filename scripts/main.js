let ol = document.querySelector('ol');

const links =  [
    {
        label: "Week 1",
        url: "week1/index.html"
    },
    {
        label: "Week 2",
        url: "week2/index.html"
    },
    {
        label: "Week 3",
        url: "week3/index.html"
    }
]

links.forEach(
    link => {
        ol.innerHTML += 
        `<li><a href="${link.url}">${link.label}</a></li>`;
    }
);

