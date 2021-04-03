import {
    Airplane
} from './airplane.js'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCoHRCs_J_idcxgB4qD74fswGSYBg741RA",
    authDomain: "weight-and-balance-4944a.firebaseapp.com",
    projectId: "weight-and-balance-4944a",
    storageBucket: "weight-and-balance-4944a.appspot.com",
    messagingSenderId: "181556140346",
    appId: "1:181556140346:web:dad7b0b14040f7bb991803",
    measurementId: "G-EJK6SWVRZ6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

let planeList = [] /*new Airplane(1687.8, 40.23, "74Y"), new Airplane(1700.8, 42.23, "AC8"), new Airplane(1701.8, 42.23, "AC8"), new Airplane(1905.8, 39.23, "88V")];*/
let currentPlane;

// Get page Elements
let mainDiv = document.querySelector('main');

let displayedAircraft = document.querySelector('#displayedAircraft');
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
const clearWeightButton = document.querySelector('#clearWeight');

function setValuesFromSelectedAircraft(plane) {
    displayedAircraft.textContent = plane.AircraftName;
    aircraftArm.value = plane.Arm.aircraftArm;
    pilotAndFrontPassArm.value = plane.Arm.pilotAndFrontPass;
    rearPassArm.value = plane.Arm.rearPass;
    aftBagOneArm.value = plane.Arm.aftBagOne;
    aftBagTwoArm.value = plane.Arm.aftBagTwo;
    fuelArm.value = plane.Arm.fuel;

    createWeightSection(plane);
    createCgLimitsSection(plane);
}

function createWeightSection(plane) {

    let weightSectionDiv = document.querySelector('#weightSectionDiv');
    if (!weightSectionDiv) {

        // create weight section
        let weightSectionDiv = document.createElement('div');
        weightSectionDiv.id = "weightSectionDiv";

        let weightSectionHeader = document.createElement('h4');
        weightSectionHeader.id = "weightSectionHeader";
        weightSectionHeader.textContent = `Weight:`;
        weightSectionDiv.appendChild(weightSectionHeader);

        let maxGrossWeightDiv = document.createElement('div');
        maxGrossWeightDiv.id = "maxGrossWeightDiv";
        maxGrossWeightDiv.textContent = `Max Gross Weight: ${plane.AircraftMaxGrossWeight}`;
        weightSectionDiv.appendChild(maxGrossWeightDiv);

        let actualWeightDiv = document.createElement('div');
        actualWeightDiv.id = "actualWeightDiv";
        actualWeightDiv.textContent = `Actual Weight: `;
        weightSectionDiv.appendChild(actualWeightDiv);

        let isWithinWeightDiv = document.createElement('div');
        isWithinWeightDiv.id = "isWithinWeightDiv";
        isWithinWeightDiv.textContent = `Is Aircraft within weight? `;
        weightSectionDiv.appendChild(isWithinWeightDiv);

        let usefulLoadDiv = document.createElement('div');
        usefulLoadDiv.id = "usefulLoadDiv";
        usefulLoadDiv.textContent = `Useful Load: `;
        weightSectionDiv.appendChild(usefulLoadDiv);

        mainDiv.appendChild(weightSectionDiv);
    }
}

function createCgLimitsSection(plane) {

    let cgLimitsDiv = document.querySelector('#cgLimitsDiv');
    if (!cgLimitsDiv) {

        // create cg limits section
        let cgLimitsDiv = document.createElement('div');
        cgLimitsDiv.id = "cgLimitsDiv";

        let cgLimitsSectionHeader = document.createElement('h4');
        cgLimitsSectionHeader.id = "cgLimitsSectionHeader";
        cgLimitsSectionHeader.textContent = `CG Limits:`;
        cgLimitsDiv.appendChild(cgLimitsSectionHeader);

        let forwardCgLimitDiv = document.createElement('div');
        forwardCgLimitDiv.id = "forwardCgLimitDiv";
        forwardCgLimitDiv.textContent = `Forward: ${plane.CgLimits.forward}`;
        cgLimitsDiv.appendChild(forwardCgLimitDiv);

        let aftCgLimitDiv = document.createElement('div');
        aftCgLimitDiv.id = "aftCgLimitDiv";
        aftCgLimitDiv.textContent = `Aft: ${plane.CgLimits.aft}`;
        cgLimitsDiv.appendChild(aftCgLimitDiv);

        let actualCgLimitDiv = document.createElement('div');
        actualCgLimitDiv.id = "actualCgLimitDiv";
        actualCgLimitDiv.textContent = `Actual: `;
        cgLimitsDiv.appendChild(actualCgLimitDiv);

        let isWithinCgLimitsDiv = document.createElement('div');
        isWithinCgLimitsDiv.id = "isWithinCgLimitsDiv";
        isWithinCgLimitsDiv.textContent = `Is CG within normal limits? `;
        cgLimitsDiv.appendChild(isWithinCgLimitsDiv);

        mainDiv.appendChild(cgLimitsDiv);
    }
}

function clearCalculations() {
    aircraftMoment.textContent = '';
    pilotAndFrontPassMoment.textContent = '';
    rearPassMoment.textContent = '';
    aftBagOneMoment.textContent = '';
    aftBagTwoMoment.textContent = '';
    fuelMoment.textContent = '';
}

function clearTotals() {
    totalWeight.textContent = '';
    totalArm.textContent = '';
    totalMoment.textContent = '';
}

function clearWeightAndCgLimits() {
    let actualWeightDiv = document.querySelector('#actualWeightDiv');
    let isWithinWeightDiv = document.querySelector('#isWithinWeightDiv');
    let usefulLoadDiv = document.querySelector('#usefulLoadDiv');
    let actualCgLimitDiv = document.querySelector('#actualCgLimitDiv');
    let isWithinCgLimitsDiv = document.querySelector('#isWithinCgLimitsDiv');

    actualWeightDiv.textContent = `Actual Weight: `;
    isWithinWeightDiv.textContent = `Is Aircraft within weight? `;
    usefulLoadDiv.textContent = `Useful Load: `;
    actualCgLimitDiv.textContent = `Actual: `;
    isWithinCgLimitsDiv.textContent = `Is CG within normal limits? `;
}

function clearUserInputWeight() {
    pilotAndFrontPassWeight.value = '';
    rearPassWeight.value = '';
    aftBagOneWeight.value = '';
    aftBagTwoWeight.value = '';
    fuelWeight.value = '';
}

function calculate() {
    if (currentPlane != null) {
        aircraftMoment.textContent = (aircraftWeight.value * aircraftArm.value).toFixed(2);
        pilotAndFrontPassMoment.textContent = (pilotAndFrontPassWeight.value * pilotAndFrontPassArm.value).toFixed(2);
        rearPassMoment.textContent = (rearPassWeight.value * rearPassArm.value).toFixed(2);
        aftBagOneMoment.textContent = (aftBagOneWeight.value * aftBagOneArm.value).toFixed(2);
        aftBagTwoMoment.textContent = (aftBagTwoWeight.value * aftBagTwoArm.value).toFixed(2);
        fuelMoment.textContent = (fuelWeight.value * fuelArm.value).toFixed(2);
        displayTotals();
    }
}

function displayTotals() {
    if (currentPlane != null) {
        totalWeight.textContent = calculateTotalWeight();
        totalArm.textContent = calculateTotalArm();
        totalMoment.textContent = calculateTotalMoment();

        let actualWeightDiv = document.querySelector('#actualWeightDiv');
        let isWithinWeightDiv = document.querySelector('#isWithinWeightDiv');
        let usefulLoadDiv = document.querySelector('#usefulLoadDiv');
        let actualCgLimitDiv = document.querySelector('#actualCgLimitDiv');
        let isWithinCgLimitsDiv = document.querySelector('#isWithinCgLimitsDiv');

        clearWeightAndCgLimits();

        actualWeightDiv.innerHTML += parseFloat(aircraftWeight.value).toFixed(2);
        isWithinWeightDiv.innerHTML += (totalWeight.textContent > currentPlane.AircraftMaxGrossWeight ? "No, aircraft is too heavy" : "Yes");
        usefulLoadDiv.innerHTML += parseFloat(currentPlane.AircraftMaxGrossWeight - totalWeight.textContent).toFixed(2);
        actualCgLimitDiv.innerHTML += parseFloat(totalArm.textContent).toFixed(2);
        isWithinCgLimitsDiv.innerHTML += ((totalArm.textContent > currentPlane.CgLimits.forward && totalArm.textContent < currentPlane.CgLimits.aft) ? "Yes" : "No, aircraft unstable");

        console.log(currentPlane.CgLimits.forward);
        console.log(currentPlane.CgLimits.aft);
        console.log(totalArm.textContent > currentPlane.CgLimits.forward);
        console.log(totalArm.textContent < currentPlane.CgLimits.aft);
    }

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
        aircraftDropDown.innerHTML += `<p id="plane${i}">${plane.AircraftName}</p>`;
        i++;
    });

    const planeTags = document.querySelectorAll('.dropdown p');
    planeTags.forEach(
        tag => {
            tag.addEventListener('click', (event) => {
                if (currentPlane == null) {
                    currentPlane = planeList[tag.id.substr(5)];
                } else {
                    if (!planeList[tag.id.substr(5)].isEqual(currentPlane)) {
                        clearCalculations();
                        clearTotals();
                        clearWeightAndCgLimits();
                    }
                }
                const dropdown = document.querySelector('.dropdown-content');
                dropdown.display = "none";
                currentPlane = planeList[tag.id.substr(5)];
                setAircraftData(planeList[tag.id.substr(5)]);

            })
        }
    )
}

function setAircraftData(plane) {
    console.log(plane);
    aircraftWeight.value = plane.AircraftWeight;
    setValuesFromSelectedAircraft(plane);
}

//####################################################################

function getPlaneListFromLocalStorage() {
    /*if (localStorage.getItem('planeList')) {
        let tempPlaneList = JSON.parse(localStorage.getItem('planeList'));

        tempPlaneList.forEach(plane => {
            plane.__proto__ = Airplane.prototype;
            planeList.push(plane);
        })
    }*/

    firebase.database().ref('planeList').once('value', function (snapshot) {
        let tempPlaneList = snapshot.val();
        tempPlaneList.forEach(plane => {
            plane.__proto__ = Airplane.prototype;
            planeList.push(plane);
        })
        displayDropDown(planeList, currentPlane);
    })
}


getPlaneListFromLocalStorage();
//displayDropDown(planeList, currentPlane);

calculateButton.addEventListener('click', calculate);
clearWeightButton.addEventListener('click', clearUserInputWeight);