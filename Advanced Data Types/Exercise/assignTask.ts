interface User {
    username: string;
    signupDate: Date;
}

type Status = 'Logged' | 'Started' | 'InProgress' | 'Done';

interface Task {
    status: Status;
    title: string;
    daysRequired: number;
    assignedTo?: User;
    changeStatus(newStatus: Status): void;
}

export function assignTask(user: User, task: Task): void {
    if (!task.assignedTo) {
        task.assignedTo = user;
        console.log(`User ${user.username} assigned to task '${task.title}'`);
    }
}