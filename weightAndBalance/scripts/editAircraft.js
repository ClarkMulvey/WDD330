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

let planeList = [] /*new Airplane(1687.8, 40.23, "74Y"), new Airplane(1700.8, 42.23, "AC8"), new Airplane(1905.8, 39.23, "88V")];*/


function writeData() {
    firebase.database().ref("plane0").set({
        name: document.querySelector('#newAircraftName').value,
        weight: document.querySelector('#newAircraftWeight').value,
        arm: document.querySelector('#newAircraftArm').value
    });
}

function getPlaneListFromLocalStorage() {
    /*if (localStorage.getItem('planeList')) {
        let tempPlaneList = JSON.parse(localStorage.getItem('planeList'));
        console.log(tempPlaneList);

        tempPlaneList.forEach(plane => {
            plane.__proto__ = Airplane.prototype;
            planeList.push(plane);
        })
    }*/
    firebase.database().ref('planeList').once('value', function(snapshot) {
        let tempPlaneList = snapshot.val();
        tempPlaneList.forEach(plane => {
            plane.__proto__ = Airplane.prototype;
            planeList.push(plane);
        })
        displayPlaneList(planeList);
    })
}

function savePlaneListToLocalStorage(planeList) {
    // localStorage.setItem('planeList', JSON.stringify(planeList));
    firebase.database().ref('planeList').set(planeList);
}

function createEditDiv(parentElement, planeList, divName, label, position, inputType) {
    // create Div
    let Div = document.createElement('div');
    Div.id = `${divName}Div`;
    // Div.classList.add("editField");

    let innerDiv = document.createElement('div');
    innerDiv.classList.add("editField");

    // create aircraft name label and add to div
    let Label = document.createElement('label');
    Label.innerHTML = label;
    innerDiv.appendChild(Label);

    // create aircraft name edit box and add to div, then add div to parent
    let Edit = document.createElement('input');
    Edit.type = inputType;
    Edit.id = `${divName}`;
    if (divName.includes("Arm") || divName.includes("CgLimits")) {
        Edit.value = planeList[position][divName.substr(0, divName.indexOf('1'))][divName.substr(divName.indexOf('1') + 1)];
    } else {
        Edit.value = planeList[position][divName];
    }
    innerDiv.appendChild(Edit);

    Div.appendChild(innerDiv);

    let Error = document.createElement('div');
    Error.classList.add('error');
    Error.id = `${divName}Error`
    Error.hidden = true;
    if (inputType == "text") {
        Error.innerHTML += "Please enter a string"
    } else if (inputType == "number") {
        Error.innerHTML += "Please enter a number/decimal"
    }
    Div.appendChild(Error);

    parentElement.appendChild(Div);
}

function createExpander(parentElement, divName) {
    let expanderLabel = document.createElement('label');
    expanderLabel.classList.add(`${divName}Expander`);
    expanderLabel.innerHTML = divName;

    let expander = document.createElement('div');
    expander.classList.add(`${divName}ExpanderData`);

    parentElement.appendChild(expanderLabel);
    parentElement.appendChild(expander);
}

function save(position, planeList, overArchingEditDiv) {
    let currentPlane = planeList[position];
    let areMainItemsCompleteAndCorrect = true;
    let areArmItemsCompleteAndCorrect = true;
    let areCgLimitsItemsCompleteAndCorrect = true;


    // get main element tags
    let mainMenuItem = overArchingEditDiv.parentElement.querySelector(`#plane${position}`);
    let aircraftNameNode = overArchingEditDiv.querySelector('#AircraftName');
    let aircraftWeightNode = overArchingEditDiv.querySelector('#AircraftWeight');
    let aircraftMaxGrossWeightNode = overArchingEditDiv.querySelector('#AircraftMaxGrossWeight');

    areMainItemsCompleteAndCorrect = verifyField(aircraftNameNode, "string", aircraftNameNode.id) &
        verifyField(aircraftWeightNode, "number", aircraftWeightNode.id) &
        verifyField(aircraftMaxGrossWeightNode, "number", aircraftMaxGrossWeightNode.id);

    // get arm element tags
    let aircraftArmNode = overArchingEditDiv.querySelector('#Arm1aircraftArm');
    let pilotAndFrontPassArmNode = overArchingEditDiv.querySelector('#Arm1pilotAndFrontPass');
    let rearPassArmNode = overArchingEditDiv.querySelector('#Arm1rearPass');
    let aftBag1ArmNode = overArchingEditDiv.querySelector('#Arm1aftBagOne');
    let aftBag2ArmNode = overArchingEditDiv.querySelector('#Arm1aftBagTwo');
    let fuelArmNode = overArchingEditDiv.querySelector('#Arm1fuel');

    // get cgLimits tags
    let forwardCgLimitsNode = overArchingEditDiv.querySelector('#CgLimits1forward');
    let aftCgLimitsNode = overArchingEditDiv.querySelector('#CgLimits1aft');



    // set arm elements
    // must check to see if the items are visible - if one of them is, they all are
    if (aircraftArmNode != null) {
        areArmItemsCompleteAndCorrect = verifyField(aircraftArmNode, "number", aircraftArmNode.id) &
            verifyField(pilotAndFrontPassArmNode, "number", pilotAndFrontPassArmNode.id) &
            verifyField(rearPassArmNode, "number", rearPassArmNode.id) &
            verifyField(aftBag1ArmNode, "number", aftBag1ArmNode.id) &
            verifyField(aftBag2ArmNode, "number", aftBag2ArmNode.id) &
            verifyField(fuelArmNode, "number", fuelArmNode.id);

        if (areArmItemsCompleteAndCorrect) {
            currentPlane.Arm.aircraftArm = aircraftArmNode.value;
            currentPlane.Arm.pilotAndFrontPass = pilotAndFrontPassArmNode.value;
            currentPlane.Arm.rearPass = rearPassArmNode.value;
            currentPlane.Arm.aftBagOne = aftBag1ArmNode.value;
            currentPlane.Arm.aftBagTwo = aftBag2ArmNode.value;
            currentPlane.Arm.fuel = fuelArmNode.value;
        }

    }

    // set cgLimits elements
    // must check to see if the items are visible - if one of them is, they all are
    if (forwardCgLimitsNode != null) {
        areCgLimitsItemsCompleteAndCorrect = verifyField(forwardCgLimitsNode, "number", forwardCgLimitsNode.id) &
            verifyField(aftCgLimitsNode, "number", aftCgLimitsNode.id);

        if (areCgLimitsItemsCompleteAndCorrect) {
            currentPlane.CgLimits.forward = forwardCgLimitsNode.value;
            currentPlane.CgLimits.aft = aftCgLimitsNode.value;
        }
    }


    if (areMainItemsCompleteAndCorrect && areArmItemsCompleteAndCorrect && areCgLimitsItemsCompleteAndCorrect) {
        // set main elements
        mainMenuItem.innerHTML = aircraftNameNode.value;
        currentPlane.AircraftName = aircraftNameNode.value;
        currentPlane.AircraftWeight = aircraftWeightNode.value;
        currentPlane.AircraftMaxGrossWeight = aircraftMaxGrossWeightNode.value;

        // save data
        savePlaneListToLocalStorage(planeList);
    };

}

function populateAircraftData(tag, parentElement, planeList) {
    let position = tag.id.substr(5);
    
    // Create overarching Edit Div
    let overArchingEditDiv = document.createElement('div');
    overArchingEditDiv.classList.add("overArchingEditDiv");

    // Create save button
    let saveButton = document.createElement('input');
    saveButton.type = "button";
    saveButton.value = "Save";
    overArchingEditDiv.appendChild(saveButton);

    // create AircraftName edit
    createEditDiv(overArchingEditDiv, planeList, "AircraftName", "Aircraft Name: ", position, "text");

    // create aircraftWeight edit
    createEditDiv(overArchingEditDiv, planeList, "AircraftWeight", "Aircraft Weight: ", position, "number");

    // create aircraftAircraftMaxGrossWeight edit
    createEditDiv(overArchingEditDiv, planeList, "AircraftMaxGrossWeight", "Aircraft Max Gross Weight: ", position, "number");

    // create option to click for Arm information
    createExpander(overArchingEditDiv, "Arm", position)

    // create option to click for cgLimits information
    createExpander(overArchingEditDiv, "CgLimits", position);

    // Append all newly created Nodes to the parentNode
    parentElement.appendChild(overArchingEditDiv);

    // add Event Listener for save button
    saveButton.addEventListener('click', (event) => {
        save(position, planeList, overArchingEditDiv);
    });

    // Add Event Listeners for armExpanders
    let armExpander = parentElement.querySelector('.ArmExpander');

    // populate when arm is clicked
    armExpander.addEventListener('click', (event) => {

        // Close the menu
        if (armExpander.classList.contains('editing')) {
            armExpander.classList.remove('editing');

            let armExpanderData = armExpander.parentElement.querySelector('.ArmExpanderData');

            const overArchingExpanderDiv = armExpanderData.querySelector('.overArchingExpanderDiv');
            armExpanderData.removeChild(overArchingExpanderDiv);
        }
        // Open the arm menu
        else {
            armExpander.classList.add('editing');

            let armExpanderData = armExpander.parentElement.querySelector('.ArmExpanderData');

            let overArchingExpanderDiv = document.createElement('div');
            overArchingExpanderDiv.classList.add("overArchingExpanderDiv");

            createEditDiv(overArchingExpanderDiv, planeList, "Arm1aircraftArm", "Aircraft Arm: ", position, "number");

            createEditDiv(overArchingExpanderDiv, planeList, "Arm1pilotAndFrontPass", "Pilot and front Pass: ", position, "number");

            createEditDiv(overArchingExpanderDiv, planeList, "Arm1rearPass", "Rear Passengers: ", position, "number");

            createEditDiv(overArchingExpanderDiv, planeList, "Arm1aftBagOne", "Aft bag 1: ", position, "number");

            createEditDiv(overArchingExpanderDiv, planeList, "Arm1aftBagTwo", "Aft bag 2: ", position, "number");

            createEditDiv(overArchingExpanderDiv, planeList, "Arm1fuel", "Fuel: ", position, "number");

            armExpanderData.appendChild(overArchingExpanderDiv);
        }

    })

    // Add Event Listeners for cgLimitsExpanders
    let cgLimitsExpander = parentElement.querySelector('.CgLimitsExpander');

    // populate when cgLimits is clicked
    cgLimitsExpander.addEventListener('click', (event) => {
        // Close the menu
        if (cgLimitsExpander.classList.contains('editing')) {
            cgLimitsExpander.classList.remove('editing');

            let cgLimitsExpanderData = armExpander.parentElement.querySelector('.CgLimitsExpanderData');

            const overArchingExpanderDiv = cgLimitsExpanderData.querySelector('.overArchingExpanderDiv');
            cgLimitsExpanderData.removeChild(overArchingExpanderDiv);
        }
        // Open the menu
        else {
            cgLimitsExpander.classList.add('editing');

            let cgLimitsExpanderData = armExpander.parentElement.querySelector('.CgLimitsExpanderData');

            let overArchingExpanderDiv = document.createElement('div');
            overArchingExpanderDiv.classList.add("overArchingExpanderDiv");

            createEditDiv(overArchingExpanderDiv, planeList, "CgLimits1forward", "Forward: ", position, "number");

            createEditDiv(overArchingExpanderDiv, planeList, "CgLimits1aft", "Aft: ", position, "number");

            cgLimitsExpanderData.appendChild(overArchingExpanderDiv);
        }

    });


}

function deletePlane(btn, planeList) {
    let deletePos = btn.id.substr(11);
    planeList.splice(deletePos, 1);
    displayPlaneList(planeList);
    savePlaneListToLocalStorage(planeList);
}

// Display plane list and add event listener to the plane item
function displayPlaneList(planeList) {

    mainDiv.innerHTML = "";

    let i = 0;
    planeList.forEach(plane => {
        mainDiv.innerHTML += `<div class="planeSection"><div class="planeList"><p id="plane${i}">${plane.AircraftName}</p>
        <input type="button" value="X" id="deletePlane${i}" class="deleteBtn">
        </div></div>`
        i++;
    });

    // create the event listeners
    const planeTags = document.querySelectorAll('#main p');
    planeTags.forEach(
        tag => {
            tag.addEventListener('click', (event) => {
                const parentElement = tag.parentElement.parentElement;
                // close the menu
                if (parentElement.classList.contains('editing')) {
                    parentElement.classList.remove('editing');
                    const overArchingEditDiv = parentElement.querySelector('.overArchingEditDiv');
                    parentElement.removeChild(overArchingEditDiv);
                }
                // Open the menu
                else {
                    parentElement.classList.add('editing');

                    populateAircraftData(tag, parentElement, planeList);
                }
            })
        }
    )

    const deleteBtns = document.querySelectorAll('#main .deleteBtn');
    deleteBtns.forEach(
        btn => {
            btn.addEventListener('click', (event) => {
                deletePlane(btn, planeList);
            })
        }
    )
}

function createNewPlaneField(label, id, overarchingNewPlaneDiv, inputType) {
    let Div = document.createElement('div');


    let innerDiv = document.createElement('div');
    innerDiv.classList.add('editField');

    let Label = document.createElement('label');
    Label.innerHTML = label;
    innerDiv.appendChild(Label);

    let Edit = document.createElement('input');
    Edit.type = inputType;
    Edit.id = id;
    Edit.att
    Edit.required = true;
    innerDiv.appendChild(Edit);

    Div.appendChild(innerDiv);

    let Error = document.createElement('div');
    Error.classList.add('error');
    Error.id = `${id}Error`
    Error.hidden = true;
    if (inputType == "text") {
        Error.innerHTML += "Please enter a string"
    } else if (inputType == "number") {
        Error.innerHTML += "Please enter a number/decimal"
    }
    Div.appendChild(Error);

    overarchingNewPlaneDiv.appendChild(Div);
}

function verifyField(tag, type, id) {
    switch (type) {
        case "string":
            let isValidString = (tag.value !== "" && typeof tag.value === type);
            let errorStringTag = tag.parentElement.parentElement.querySelector(`#${id}Error`);
            if (!isValidString) {
                errorStringTag.hidden = false;
            } else {
                errorStringTag.hidden = true;
            }
            return isValidString;
            break;
        case "number":
            let isValidNumber = (tag.value !== "" && typeof (parseFloat(tag.value)) === type && parseFloat(tag.value) === parseFloat(tag.value));
            let errorNumberTag = tag.parentElement.parentElement.querySelector(`#${id}Error`);
            if (!isValidNumber) {
                errorNumberTag.hidden = false;
            } else {
                errorNumberTag.hidden = true;
            }
            return isValidNumber;
            break;
        default:

    }
}

const newPlaneBtn = document.querySelector('#newPlaneBtn');
newPlaneBtn.addEventListener('click', (event) => {
    // close the menu
    if (newPlaneBtn.classList.contains('editing')) {
        newPlaneBtn.classList.remove('editing');
        let overarchingNewPlaneDiv = newPlaneBtn.parentElement.querySelector('#newPlaneDiv');
        newPlaneBtn.parentElement.removeChild(overarchingNewPlaneDiv);
    }
    // open the menu
    else {
        newPlaneBtn.classList.add('editing');
        let newPlaneBtnParent = newPlaneBtn.parentElement;

        // create overarching new div
        let overarchingNewPlaneDiv = document.createElement('div');
        overarchingNewPlaneDiv.id = "newPlaneDiv";
        overarchingNewPlaneDiv.classList.add('editing');

        // create save button
        let saveBtnDiv = document.createElement('div');
        let saveBtn = document.createElement('input');
        saveBtn.type = "button";
        saveBtn.id = `newAircraftSaveBtn`;
        saveBtn.value = 'Save';
        saveBtnDiv.appendChild(saveBtn);
        overarchingNewPlaneDiv.appendChild(saveBtnDiv);

        // create entry for Aircraft name
        createNewPlaneField('Aircraft Name: ', 'newAircraftName', overarchingNewPlaneDiv, "text");

        // create entry for Aircraft Weight
        createNewPlaneField('Aircraft Weight: ', 'newAircraftWeight', overarchingNewPlaneDiv, "number");

        // create entry for Aircraft Arm
        createNewPlaneField('Aircraft Arm: ', 'newAircraftArm', overarchingNewPlaneDiv, "number");



        newPlaneBtnParent.appendChild(overarchingNewPlaneDiv);

        saveBtn.addEventListener('click', (event) => {
            let newAircraftName = document.querySelector('#newAircraftName');
            let newAircraftWeight = document.querySelector('#newAircraftWeight');
            let newAircraftArm = document.querySelector('#newAircraftArm');

            let isFormCompleteAndCorrect = verifyField(newAircraftName, "string", newAircraftName.id) &
                verifyField(newAircraftWeight, "number", newAircraftWeight.id) &
                verifyField(newAircraftArm, "number", newAircraftArm.id);


            if (isFormCompleteAndCorrect) {
                // create new instance of an Aircraft
                let newAircraft = new Airplane(newAircraftWeight.value, newAircraftArm.value, newAircraftName.value);

                // deal with data
                planeList.push(newAircraft);
                savePlaneListToLocalStorage(planeList);

                // display the newly updated list
                displayPlaneList(planeList);

                // Remove the new plane Menu
                newPlaneBtn.classList.remove('editing');
                newPlaneBtn.parentElement.removeChild(overarchingNewPlaneDiv);
            }
        });
    }

});

const mainDiv = document.querySelector('#main');
getPlaneListFromLocalStorage();