let ol = document.querySelector('ol');
let weeklyList = document.querySelector('#weeklyList');

const links =  [
    {
        label: "Week 1",
        url: "../week1/index.html"
    },
    {
        label: "Week 2",
        url: "../week2/index.html"
    },
    {
        label: "Week 3",
        url: "../week3/index.html"
    },
    {
        label: "Week 4",
        url: "../week4/index.html"
    },
    {
        label: "Week 5/6",
        url: "../week5/index.html"
    },
    {
        label: "Week 7",
        url: "../week7/index.html"
    },
    {
        label: "Week 8",
        url: "../week8/index.html"
    },
    {
        label: "Week 9",
        url: "../week9/index.html"
    },
    {
        label: "Week 10",
        url: "../week10/index.html"
    },
    {
        label: "Week 11",
        url: "../week11/index.html"
    },
    {
        label: "Block 2 Challenge - Weight and Balance",
        url: "../weightAndBalance/index.html"
    }
]


weeklyList.addEventListener('click', () => {
    if (weeklyList.classList.contains('viewing')) {
        weeklyList.classList.remove('viewing');
        ol.innerHTML = "";
    } else {
        weeklyList.classList.add('viewing');
        links.forEach(
            link => {
                ol.innerHTML += 
                `<li><a href="${link.url}">${link.label}</a></li>`;
            }
        );
    }

});

