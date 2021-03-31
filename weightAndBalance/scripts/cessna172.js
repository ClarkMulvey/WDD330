export class Cessna172 {
    constructor() {
        this.Arm = {
            "pilotAndFrontPass" : 37,
            "rearPass" : 73,
            "aftBagOne" : 95,
            "aftBagTwo" : 123,
            "fuel" : 48,
        }
        this.AircraftMaxGrossWeight = 2550;
        this.CgLimits = {
            "forward" : 40.5,
            "aft" : 47.2
        }
    }
}