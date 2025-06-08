// 7. Class Counter
class Counter {
    private static count: number = 0;

    static increment(): void {
        Counter.count++;
    }

    static getCount(): number {
        return Counter.count;
    }
}

// Example usage:
// Counter.increment();
// Counter.increment();
// console.log(Counter.getCount()); // 2