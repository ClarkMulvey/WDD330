import { Cessna172 } from './cessna172.js'

export class Airplane extends Cessna172 {
    constructor(aircraftWeight, aircraftArm, AircraftName) {
        super();
        this.AircraftWeight = aircraftWeight;
        this.Arm.aircraftArm = aircraftArm;
        this.AircraftName = AircraftName;
    }

    displayPlane() {
        console.log("display Plane");
    }

    isEqual(airplane) {
        return (this.AircraftWeight == airplane.AircraftWeight && this.AircraftName == airplane.AircraftName);
    }
}