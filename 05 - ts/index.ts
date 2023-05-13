interface Driveable {
    speed: number;
    drive(): string;
}

class Car implements Driveable {
    speed = 10;

    drive() {
        console.log(`I am driving at ${this.speed}`);
        return 'a string';
    }
}

const myNewCar = new Car();

const startDriving = (vehicle: Driveable) => {
    vehicle.drive();
};

startDriving(myNewCar);