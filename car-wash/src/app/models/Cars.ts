export class CarMake {
    id: string;
    name: string;
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

export class CarModel {
    name: string;
    makeId: string;
    /**
     *
     */
    constructor(name, make_id) {
        this.name = name;
        this.makeId = make_id;
    }
}

export class Car {
    id: string;
    make: string;
    model: string;
    registrationPlate: string;
    year: string;
    carType: CarType;
}

export class CarType {
    id: string;
    name: string;
    /**
     *
     */
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
