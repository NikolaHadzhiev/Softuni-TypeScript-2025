// 13. Inventory System
class Product {
    private static productCount: number = 0;
    readonly id: number;
    private _name: string;
    private _price: number;

    constructor(name: string, price: number) {
        if (name.length < 1) {
            throw new Error("Name must contain at least 1 character");
        }
        if (price <= 0) {
            throw new Error("Price must be positive");
        }
        Product.productCount++;
        this.id = Product.productCount;
        this._name = name;
        this._price = price;
    }

    get name(): string {
        return this._name;
    }

    set name(newName: string) {
        if (newName.length < 1) {
            throw new Error("Name must contain at least 1 character");
        }
        this._name = newName;
    }

    get price(): number {
        return this._price;
    }

    set price(newPrice: number) {
        if (newPrice <= 0) {
            throw new Error("Price must be positive");
        }
        this._price = newPrice;
    }

    getDetails(): string {
        return `ID: ${this.id}, Name: ${this.name}, Price: $${this.price}`;
    }

    static get totalProductsCreated(): number {
        return Product.productCount;
    }
}

class Inventory {
    private products: Product[] = [];

    addProduct(product: Product): void {
        this.products.push(product);
    }

    listProducts(): string {
        let result = "";
        this.products.forEach(product => {
            result += product.getDetails() + "\n";
        });
        result += `Total products created: ${Product.totalProductsCreated}`;
        return result;
    }
}

// Example usage:
// const inventory = new Inventory();
// const product1 = new Product("Laptop", 1200);
// const product2 = new Product("Phone", 800);
// inventory.addProduct(product1);
// inventory.addProduct(product2);
// console.log(inventory.listProducts());