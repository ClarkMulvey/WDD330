import {
    Airplane
} from './airplane.js'

// Get page Elements
let aircraftDropDown = document.querySelector('.dropdown-content');

let aircraftWeight = document.querySelector('#aircraftWeight');
let aircraftArm = document.querySelector('#aircraftArm');
let aircraftMoment = document.querySelector('#aircraftMoment');

let pilotAndFrontPassWeight = document.querySelector('#pilotAndFrontPassWeight');
let pilotAndFrontPassArm = document.querySelector('#pilotAndFrontPassArm');
let pilotAndFrontPassMoment = document.querySelector('#pilotAndFrontPassMoment');

let rearPassWeight = document.querySelector('#rearPassWeight');
let rearPassArm = document.querySelector('#rearPassArm');
let rearPassMoment = document.querySelector('#rearPassMoment');

let aftBagOneWeight = document.querySelector('#aftBagOneWeight');
let aftBagOneArm = document.querySelector('#aftBagOneArm');
let aftBagOneMoment = document.querySelector('#aftBagOneMoment');

let aftBagTwoWeight = document.querySelector('#aftBagTwoWeight');
let aftBagTwoArm = document.querySelector('#aftBagTwoArm');
let aftBagTwoMoment = document.querySelector('#aftBagTwoMoment');

let fuelWeight = document.querySelector('#fuelWeight');
let fuelArm = document.querySelector('#fuelArm');
let fuelMoment = document.querySelector('#fuelMoment');

let totalWeight = document.querySelector('#totalWeight');
let totalArm = document.querySelector('#totalArm');
let totalMoment = document.querySelector('#totalMoment');

const calculateButton = document.querySelector('#calculate');

function setValuesFromSelectedAircraft(plane) {
    aircraftArm.textContent = plane.Arm.aircraftArm;
    pilotAndFrontPassArm.textContent = plane.Arm.pilotAndFrontPass;
    rearPassArm.textContent = plane.Arm.rearPass;
    aftBagOneArm.textContent = plane.Arm.aftBagOne;
    aftBagTwoArm.textContent = plane.Arm.aftBagTwo;
    fuelArm.textContent = plane.Arm.fuel;
}

function clearCalculations() {
    aircraftMoment.textContent = '';
    pilotAndFrontPassMoment.textContent = '';
    rearPassMoment.textContent = '';
    aftBagOneMoment.textContent = '';
    aftBagTwoMoment.textContent = '';
    fuelMoment.textContent = '';
    displayTotals();
}

function clearTotals() {
    totalWeight.textContent = '';
    totalArm.textContent = '';
    totalMoment.textContent = '';
}

function calculate() {
    aircraftMoment.textContent = (aircraftWeight.value * aircraftArm.textContent).toFixed(2);
    pilotAndFrontPassMoment.textContent = (pilotAndFrontPassWeight.value * pilotAndFrontPassArm.textContent).toFixed(2);
    rearPassMoment.textContent = (rearPassWeight.value * rearPassArm.textContent).toFixed(2);
    aftBagOneMoment.textContent = (aftBagOneWeight.value * aftBagOneArm.textContent).toFixed(2);
    aftBagTwoMoment.textContent = (aftBagTwoWeight.value * aftBagTwoArm.textContent).toFixed(2);
    fuelMoment.textContent = (fuelWeight.value * fuelArm.textContent).toFixed(2);
    displayTotals();
}

function displayTotals() {
    totalWeight.textContent = calculateTotalWeight();
    totalArm.textContent = calculateTotalArm();
    totalMoment.textContent = calculateTotalMoment();
}

function calculateTotalWeight() {
    let total = 0;
    total += parseFloat(aircraftWeight.value == "" ? 0 : aircraftWeight.value);
    total += parseFloat(pilotAndFrontPassWeight.value == "" ? 0 : pilotAndFrontPassWeight.value);
    total += parseFloat(rearPassWeight.value == "" ? 0 : rearPassWeight.value);
    total += parseFloat(aftBagOneWeight.value == "" ? 0 : aftBagOneWeight.value);
    total += parseFloat(aftBagTwoWeight.value == "" ? 0 : aftBagTwoWeight.value);
    total += parseFloat(fuelWeight.value == "" ? 0 : fuelWeight.value);

    return total.toFixed(2);
}

function calculateTotalMoment() {
    let total = 0;
    total += parseFloat(aircraftMoment.textContent == "" ? 0 : aircraftMoment.textContent);
    total += parseFloat(pilotAndFrontPassMoment.textContent == "" ? 0 : pilotAndFrontPassMoment.textContent);
    total += parseFloat(rearPassMoment.textContent == "" ? 0 : rearPassMoment.textContent);
    total += parseFloat(aftBagOneMoment.textContent == "" ? 0 : aftBagOneMoment.textContent);
    total += parseFloat(aftBagTwoMoment.textContent == "" ? 0 : aftBagTwoMoment.textContent);
    total += parseFloat(fuelMoment.textContent == "" ? 0 : fuelMoment.textContent);

    return total.toFixed(2);
}

function calculateTotalArm() {
    return (calculateTotalMoment() / calculateTotalWeight()).toFixed(2);
}

function displayDropDown(planeList) {
    let i = 0;
    planeList.forEach(plane => {
        aircraftDropDown.innerHTML += `<p id="plane${i}">${plane.AircraftName}</p>`
        i++;
    });

    const planeTags = document.querySelectorAll('.dropdown p');
    planeTags.forEach(
        tag => {
            tag.addEventListener('click', (event) => {
                if (!currentPlane == null) {
                    if (!planeList[tag.id.substr(5)].isEqual(currentPlane)) {
                        clearCalculations();
                        clearTotals();
                    }
                }
                setAircraftData(planeList[tag.id.substr(5)]);
            })
        }
    )
}

function setAircraftData(plane) {
    currentPlane = plane;
    aircraftWeight.value = plane.AircraftWeight;
    setValuesFromSelectedAircraft(plane);
}

//####################################################################
let planeList = [] /*new Airplane(1687.8, 40.23, "74Y"), new Airplane(1700.8, 42.23, "AC8"), new Airplane(1701.8, 42.23, "AC8"), new Airplane(1905.8, 39.23, "88V")];*/

function getPlaneListFromLocalStorage() {
    if (localStorage.getItem('planeList')) {
        let tempPlaneList = JSON.parse(localStorage.getItem('planeList'));

        tempPlaneList.forEach(plane => {
            plane.__proto__ = Airplane.prototype;
            planeList.push(plane);
        })
    }
}

let currentPlane;
getPlaneListFromLocalStorage();
displayDropDown(planeList, currentPlane);

calculateButton.addEventListener('click', calculate);