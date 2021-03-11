const originalUrl = "https://swapi.dev/api/starships/";
fetchData(originalUrl);


function displayShipAdvanced(ships, name) {
    ships.results.forEach(
        ship => {
            console.log(ship);
            if (ship.name === name) {
                console.log(ship);
            }
        }
    );
}

function print(ships) {
    let main = document.querySelector('main');

    // show count
    main.innerHTML += `<h2>There are ${ships.count} ships`;
    main.innerHTML += `<div id="shipList"></div>`
    const shipList = document.querySelector('#shipList');
    ships.results.forEach(
        ship => {
            shipList.innerHTML +=
                `<div class="shipList">${ship.name}</div>`;

        }
    );
    

    if (ships.previous) {
        console.log(ships.previous);
        const prevBtn = document.createElement("button");
        prevBtn.textContent = "Previous";

        prevBtn.addEventListener('click', () => {
            console.log("clicked previous");

            // delete contents of the page
            main.innerHTML = '';

            // fetch new request and print to screen
            fetchData(ships.previous);
        });

        main.append(prevBtn);
    }
    
    if (ships.next) {

        console.log(ships.next);
        const nextBtn = document.createElement("button");
        nextBtn.textContent = "Next";

        nextBtn.addEventListener('click', () => {
            console.log("clicked next");

            // delete contents of the page
            main.innerHTML = '';

            // fetch new request and print to screen
            fetchData(ships.next);
        });

        main.append(nextBtn);
    }

    console.log(shipList);
    shipList.addEventListener("click", (event) => {
        console.log(event.target);
        displayShipAdvanced(ships, event.target.name);
    })


}



function fetchData(url) {
    // we want at least two thens every time we call fetch
    fetch(url)
        .then(result => result.json())
        .then(jsonResult => {

            console.log(jsonResult);

            print(jsonResult);
        });
}