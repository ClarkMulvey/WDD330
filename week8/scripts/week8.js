function print(people) {
    let main = document.querySelector('main');

    // show count
    main.innerHTML += `<h2>There are ${people.count} people`;
    people.results.forEach(
        person => {
            main.innerHTML +=
                `<div>${person.name}</div>`
        }
    );
}

if (localStorage.people) {
    let people = JSON.parse(localStorage.people);
    print(people);
} else {
    // we want at least two thens every time we call fetch
    fetch("https://swapi.dev/api/people/")
        .then(result => result.json())
        .then(jsonResult => {
            // store result in local storage
            localStorage.setItem('people', JSON.stringify(jsonResult));

            print(jsonResult);
        });
}