// 8. Readonly Modifier
class Book {
    readonly title: string;
    readonly author: string;

    constructor(title: string, author: string) {
        this.title = title;
        this.author = author;
    }
}

// Example usage:
// const book = new Book("1984", "George Orwell");
// console.log(`${book.title} by ${book.author}`); // 1984 by George Orwell