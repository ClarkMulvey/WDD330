
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