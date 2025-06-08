// 9. Abstract Class
abstract class Shape {
    color: string;

    constructor(color: string) {
        this.color = color;
    }

    public abstract getArea(): number;
}

class Circle extends Shape {
    public radius: number;

    constructor(color: string, radius: number) {
        super(color);
        this.radius = radius;
    }

    public override getArea(): number {
        return Math.PI * this.radius * this.radius;
    }
}

class Rectangle extends Shape {
    public sideA: number;
    public sideB: number;

    constructor(color: string, sideA: number, sideB: number) {
        super(color);
        this.sideA = sideA;
        this.sideB = sideB;
    }

    public override getArea(): number {
        return this.sideA * this.sideB;
    }
}

// Example usage:
// const circle = new Circle("red", 5);
// console.log(circle.getArea()); // 78.53981633974483
// const rectangle = new Rectangle("blue", 4, 6);
// console.log(rectangle.getArea()); // 24
