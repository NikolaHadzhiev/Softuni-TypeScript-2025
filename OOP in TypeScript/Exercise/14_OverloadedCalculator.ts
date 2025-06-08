// 14. Overloaded Calculator
class Calculator {
    // Method overloads
    calculate(operation: 'power' | 'log', a: number, b: number): number;
    calculate(operation: 'add' | 'subtract' | 'multiply' | 'divide', a: number, b: number): number;
    calculate(operation: 'add' | 'subtract' | 'multiply' | 'divide', a: number, b: number, c: number): number;
    calculate(operation: 'add' | 'subtract' | 'multiply' | 'divide', a: number, b: number, c: number, d: number): number;

    // Implementation
    calculate(operation: string, ...args: number[]): number {
        switch (operation) {
            case 'power':
                if (args.length !== 2) throw new Error('Power operation requires exactly 2 arguments');
                return Math.pow(args[0], args[1]);
            
            case 'log':
                if (args.length !== 2) throw new Error('Log operation requires exactly 2 arguments');
                return Math.log(args[0]) / Math.log(args[1]);
            
            case 'add':
                if (args.length < 2 || args.length > 4) throw new Error('Add operation requires 2-4 arguments');
                return args.reduce((sum, num) => sum + num, 0);
            
            case 'subtract':
                if (args.length < 2 || args.length > 4) throw new Error('Subtract operation requires 2-4 arguments');
                return args.reduce((result, num, index) => index === 0 ? num : result - num);
            
            case 'multiply':
                if (args.length < 2 || args.length > 4) throw new Error('Multiply operation requires 2-4 arguments');
                return args.reduce((product, num) => product * num, 1);
            
            case 'divide':
                if (args.length < 2 || args.length > 4) throw new Error('Divide operation requires 2-4 arguments');
                return args.reduce((result, num, index) => index === 0 ? num : result / num);
            
            default:
                throw new Error('Invalid operation');
        }
    }
}

// Example usage:
// const calc = new Calculator();
// console.log(calc.calculate('power', 2, 3)); // 8
// console.log(calc.calculate('power', 4, 1/2)); // 2
// console.log(calc.calculate('log', 8, 2)); // 3
// console.log(calc.calculate('add', 10, 5)); // 15
// console.log(calc.calculate('add', 10, 5, 3)); // 18
// console.log(calc.calculate('subtract', 10, 5)); // 5
// console.log(calc.calculate('multiply', 2, 3, 4)); // 24
// console.log(calc.calculate('divide', 100, 5, 2, 2)); // 5