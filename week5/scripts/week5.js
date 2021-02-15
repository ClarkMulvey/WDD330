
let linksList = document.querySelector('#links');

const linksListItems =  [
    {
        label: "Team Activity",
        url: "TeamActivity/index.html"
    },
    {
        label: "ToDo Application",
        url: "todo.html"
    }
]

linksListItems.forEach(
    link => {
        linksList.innerHTML += 
        `<li><a href="${link.url}">${link.label}</a></li>`;
    }
);