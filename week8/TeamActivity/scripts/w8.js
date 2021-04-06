const originalUrl = "https://swapi.dev/api/starships/";
fetchData(originalUrl);
let detailedShipTag = document.querySelector('#detailedShip');

function displayShipAdvanced(ships, name) {
    detailedShipTag.innerHTML = "";
    ships.results.forEach(
        ship => {
            if (ship.name == name) {
                detailedShipTag.innerHTML += `<h2>${ship.name}</h2>
                <div>
                        <div>
                            <h3>Passengers</h3>
                            <p>${ship.passengers}</p>
                        </div>
                        <div>
                            <h3>Crew</h3>
                            <p>${ship.crew}</p>
                        </div>
                        <div>
                            <h3>Length</h3>
                            <p>${ship.length}</p>
                        </div>
                        <div>
                            <h3>Manufacturer</h3>
                            <p>${ship.manufacturer}</p>
                        </div>
                        <div>
                            <h3>Cost</h3>
                            <p>${ship.cost_in_credits}</p>
                        </div>
                        <div>
                            <h3>Cargo Capacity</h3>
                            <p>${ship.cargo_capacity}</p>
                        </div>
                        <div>
                            <h3>Class</h3>
                            <p>${ship.starship_class}</p>
                        </div>
                </div>`;
            }
        }
    );
}

function print(ships) {
    let main = document.querySelector('main');

    // show count
    main.innerHTML += `<h2>There are ${ships.count} ships`;
    main.innerHTML += `<p>Please click a ship for more Info:</p>`
    main.innerHTML += `<div id="shipList"></div>`
    const shipList = document.querySelector('#shipList');
    ships.results.forEach(
        ship => {
            shipList.innerHTML +=
                `<div class="shipList">${ship.name}</div>`;

        }
    );  

    if (ships.previous) {
        const prevBtn = document.createElement("button");
        prevBtn.textContent = "Previous";

        prevBtn.addEventListener('click', () => {

            // delete contents of the page
            main.innerHTML = '';
            detailedShipTag.innerHTML = "";

            // fetch new request and print to screen
            fetchData(ships.previous);
        });

        main.append(prevBtn);
    }
    
    if (ships.next) {

        const nextBtn = document.createElement("button");
        nextBtn.textContent = "Next";

        nextBtn.addEventListener('click', () => {

            // delete contents of the page
            main.innerHTML = '';
            detailedShipTag.innerHTML = "";

            // fetch new request and print to screen
            fetchData(ships.next);
        });

        main.append(nextBtn);
    }

    shipList.addEventListener("click", (event) => {
        displayShipAdvanced(ships, event.target.textContent);
    })


}



function fetchData(url) {
    // we want at least two thens every time we call fetch
    fetch(url)
        .then(result => result.json())
        .then(jsonResult => {
            print(jsonResult);
        });
}