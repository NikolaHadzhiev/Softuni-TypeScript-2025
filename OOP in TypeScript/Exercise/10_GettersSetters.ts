// 10. Getters and Setters (Accessors)
class User {
    private _username: string;

    constructor(username: string) {
        if (username.length < 3) {
            throw new Error("Username must be at least 3 characters long");
        }
        this._username = username;
    }

    get username(): string {
        return this._username;
    }

    set username(newUsername: string) {
        if (newUsername.length < 3) {
            throw new Error("Username must be at least 3 characters long");
        }
        this._username = newUsername;
    }
}

// Example usage:
// const user = new User("Martin");
// user.username = "johnDoe";
// console.log(user.username); // johnDoe