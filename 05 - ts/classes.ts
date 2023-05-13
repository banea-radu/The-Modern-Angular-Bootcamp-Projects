class Car1 {
    /* THIS IS THE SAME AS THE FOLLOWING SHORTCUT CODE
    public color: string;
    private year: number;

    constructor(color: string, year: number) {
        this.color = color;
        this.year = year;
    }
    */

    constructor(public color: string, private year: number) {}

    public drive() {
        this.putInGear();
        this.pressPedal();
        this.turnWheel();
        console.log(this.year);
        console.log('Vroom');
    }

    private putInGear() {

    }

    private pressPedal() {

    }

    private turnWheel() {

    }
}

const myCar = new Car1('red', 2000);
myCar.drive();

console.log(myCar.color);