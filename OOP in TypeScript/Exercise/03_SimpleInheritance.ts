// 3. Simple Inheritance
class Vehicle {
    brand: string;

    constructor(brand: string) {
        this.brand = brand;
    }

    drive(): string {
        return `Driving a ${this.brand}`;
    }
}

class Car extends Vehicle {
    model: string;

    constructor(brand: string, model: string) {
        super(brand);
        this.model = model;
    }

    public override drive(): string {
        return `Driving a ${this.brand} ${this.model}`;
    }
}

// Example usage:
const car = new Car("Toyota", "Corolla");
console.log(car.drive()); // Driving a Toyota Corolla