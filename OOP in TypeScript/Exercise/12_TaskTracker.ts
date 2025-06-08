// 12. Simple Task Tracker with Access Control
class Task {
    title: string;
    description: string;
    completed: boolean;
    private _createdBy: string;

    constructor(title: string, description: string, createdBy: string) {
        this.title = title;
        this.description = description;
        this._createdBy = createdBy;
        this.completed = false;
    }

    get createdBy(): string {
        return this._createdBy;
    }

    toggleStatus(): void {
        this.completed = !this.completed;
    }

    getDetails(): string {
        const status = this.completed ? "Completed" : "Pending";
        return `Task: ${this.title} - ${this.description} - ${status}`;
    }

    static createSampleTasks(): Task[] {
        return [
            new Task("Buy groceries", "Get milk, bread, and eggs", "John"),
            new Task("Walk the dog", "Take the dog for a 30-minute walk", "Jane")
        ];
    }
}

// Example usage:
// const task1 = new Task("Complete homework", "Finish math exercises", "Charlie");
// task1.toggleStatus();
// console.log(task1.getDetails()); // Task: Complete homework - Finish math exercises - Completed