import {
    Airplane
} from './airplane.js'

let planeList = [new Airplane(1687.8, 40.23, "74Y"), new Airplane(1700.8, 42.23, "AC8"), new Airplane(1905.8, 39.23, "88V")];

function getPlaneListFromLocalStorage() {
    if (localStorage.getItem('planeList')) {
        let tempPlaneList = JSON.parse(localStorage.getItem('planeList'));

        tempPlaneList.forEach(plane => {
            plane.__proto__ = Airplane.prototype;
            planeList.push(plane);
        })
    }
}

function savePlaneListToLocalStorage(planeList) {
    localStorage.setItem('planeList', JSON.stringify(planeList));
}

function createEditDiv(parentElement, planeList, divName, label, position) {
    // create Div
    let Div = document.createElement('div');
    Div.id = `${divName}Div`;

    // create aircraft name label and add to div
    let Label = document.createElement('label');
    Label.innerHTML = label;
    Div.appendChild(Label);

    // create aircraft name edit box and add to div, then add div to parent
    let Edit = document.createElement('input');
    Edit.type = "text";
    Edit.id = `${divName}`;
    if (divName.includes("Arm") || divName.includes("CgLimits")) {
        Edit.value = planeList[position][divName.substr(0, divName.indexOf('1'))][divName.substr(divName.indexOf('1') + 1)];
    } else {
        Edit.value = planeList[position][divName];
    }
    Div.appendChild(Edit);
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

    // get main element tags
    let mainMenuItem = overArchingEditDiv.parentElement.querySelector(`#plane${position}`);
    let aircraftNameNode = overArchingEditDiv.querySelector('#AircraftName');
    let aircraftWeightNode = overArchingEditDiv.querySelector('#AircraftWeight');
    let aircraftMaxGrossWeightNode = overArchingEditDiv.querySelector('#AircraftMaxGrossWeight');

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

    // set main elements
    mainMenuItem.innerHTML = aircraftNameNode.value;
    currentPlane.AircraftName = aircraftNameNode.value;
    currentPlane.AircraftWeight = aircraftWeightNode.value;
    currentPlane.AircraftMaxGrossWeight = aircraftMaxGrossWeightNode.value;

    // set arm elements
    // must check to see if the items are visible - if one of them is, they all are
    if (aircraftArmNode != null) {
        currentPlane.Arm.aircraftArm = aircraftArmNode.value;
        currentPlane.Arm.pilotAndFrontPass = pilotAndFrontPassArmNode.value;
        currentPlane.Arm.rearPass = rearPassArmNode.value;
        currentPlane.Arm.aftBagOne = aftBag1ArmNode.value;
        currentPlane.Arm.aftBagTwo = aftBag2ArmNode.value;
        currentPlane.Arm.fuel = fuelArmNode.value;
    }

    // set cgLimits elements
    // must check to see if the items are visible - if one of them is, they all are
    if (forwardCgLimitsNode != null) {
        currentPlane.CgLimits.forward = forwardCgLimitsNode.value;
        currentPlane.CgLimits.aft = aftCgLimitsNode.value;
    }

    savePlaneListToLocalStorage(planeList);

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
    createEditDiv(overArchingEditDiv, planeList, "AircraftName", "Aircraft Name: ", position);

    // create aircraftWeight edit
    createEditDiv(overArchingEditDiv, planeList, "AircraftWeight", "Aircraft Weight: ", position);

    // create aircraftAircraftMaxGrossWeight edit
    createEditDiv(overArchingEditDiv, planeList, "AircraftMaxGrossWeight", "Aircraft Max Gross Weight: ", position);

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

            createEditDiv(overArchingExpanderDiv, planeList, "Arm1aircraftArm", "Aircraft Arm: ", position);

            createEditDiv(overArchingExpanderDiv, planeList, "Arm1pilotAndFrontPass", "Pilot and front Pass: ", position);

            createEditDiv(overArchingExpanderDiv, planeList, "Arm1rearPass", "Rear Passengers: ", position);

            createEditDiv(overArchingExpanderDiv, planeList, "Arm1aftBagOne", "Aft bag 1: ", position);

            createEditDiv(overArchingExpanderDiv, planeList, "Arm1aftBagTwo", "Aft bag 2: ", position);

            createEditDiv(overArchingExpanderDiv, planeList, "Arm1fuel", "Fuel: ", position);

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

            createEditDiv(overArchingExpanderDiv, planeList, "CgLimits1forward", "Forward: ", position);

            createEditDiv(overArchingExpanderDiv, planeList, "CgLimits1aft", "Aft: ", position);

            cgLimitsExpanderData.appendChild(overArchingExpanderDiv);
        }

    });


}

// Display plane list and add event listener to the plane item
function displayPlaneList(planeList) {

    mainDiv.innerHTML = "";

    let i = 0;
    planeList.forEach(plane => {
        mainDiv.innerHTML += `<div><p id="plane${i}">${plane.AircraftName}</p></div>`
        i++;
    });

    // create the event listeners
    const planeTags = document.querySelectorAll('#main p');
    planeTags.forEach(
        tag => {
            tag.addEventListener('click', (event) => {
                const parentElement = tag.parentElement;
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
}

function createNewPlaneField(label, id, overarchingNewPlaneDiv) {
    let Div = document.createElement('div');

    let Label = document.createElement('label');
    Label.innerHTML = label;
    Div.appendChild(Label);

    let Edit = document.createElement('input');
    Edit.type = "text";
    Edit.id = id;
    Edit.att
    Edit.required = true;
    //Edit.setAttribute("form", "newPlaneForm");
    Div.appendChild(Edit);
    overarchingNewPlaneDiv.appendChild(Div);
}

function verifyField(tag, type){
    switch (type) {
        case "string":
            return (tag.value !== "" && typeof tag.value === type);
            break;
        case "number":
            return (tag.value !== "" && typeof(parseFloat(tag.value)) === type && parseFloat(tag.value) === parseFloat(tag.value));
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
        overarchingNewPlaneDiv.id = "newPlaneForm";
    
        // create entry for Aircraft name
        createNewPlaneField('Aircraft Name: ', 'newAircraftName', overarchingNewPlaneDiv);
    
        // create entry for Aircraft Weight
        createNewPlaneField('Aircraft Weight: ', 'newAircraftWeight', overarchingNewPlaneDiv);
    
        // create entry for Aircraft Arm
        createNewPlaneField('Aircraft Arm: ', 'newAircraftArm', overarchingNewPlaneDiv);
    
        // create save button
        let saveBtnDiv = document.createElement('div');
        let saveBtn = document.createElement('input');
        saveBtn.type = "button";
        saveBtn.id = `newAircraftSaveBtn`;
        saveBtn.value = 'Save';
        //saveBtn.setAttribute('form', 'newPlaneForm');
        saveBtnDiv.appendChild(saveBtn);
        overarchingNewPlaneDiv.appendChild(saveBtnDiv);
        
        newPlaneBtnParent.appendChild(overarchingNewPlaneDiv);

        saveBtn.addEventListener('click', (event) => {
            let newAircraftName = document.querySelector('#newAircraftName');
            let newAircraftWeight = document.querySelector('#newAircraftWeight');
            let newAircraftArm = document.querySelector('#newAircraftArm');

            console.log(verifyField(newAircraftName, "string"));           
            console.log(verifyField(newAircraftWeight, "number"));
            console.log(verifyField(newAircraftArm, "number"));

            let newAircraft = new Airplane(newAircraftWeight.value, newAircraftArm.value, newAircraftName.value);

            planeList.push(newAircraft);

            displayPlaneList(planeList);

            // Remove the new plane Menu
            newPlaneBtn.classList.remove('editing');
            newPlaneBtn.parentElement.removeChild(overarchingNewPlaneDiv);

            savePlaneListToLocalStorage(planeList);
        });
    }

});

const mainDiv = document.querySelector('#main');
getPlaneListFromLocalStorage();
displayPlaneList(planeList);