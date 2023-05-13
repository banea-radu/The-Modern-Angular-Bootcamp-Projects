export class Car {
    year: number;

    constructor() {
        this.year = 10;
    }

    drive(speed: number) {
        console.log(`Driving at ${speed}`);
    }
}

const myCar = new Car();
console.log(myCar.year); // undefined