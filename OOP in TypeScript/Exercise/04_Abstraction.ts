// 4. Abstraction
interface Animal {
    makeSound(): string;
}

class Dog implements Animal {
    public makeSound(): string {
        return "Woof";
    }
}

// Example usage:
// const dog = new Dog();
// console.log(dog.makeSound()); // Woof