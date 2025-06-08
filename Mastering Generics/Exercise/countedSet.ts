export interface CountableSet<T> {
    add(item: T): void;
    remove(item: T): void;
    contains(item: T): boolean;
    getNumberOfCopies(item: T): number;
}

export class CountedSet<T> implements CountableSet<T> {
    private map = new Map<T, number>();

    add(item: T): void {
        this.map.set(item, (this.map.get(item) || 0) + 1);
    }

    remove(item: T): void {
        if (this.map.has(item) && this.map.get(item)! > 0) {
            this.map.set(item, this.map.get(item)! - 1);
        }
    }

    contains(item: T): boolean {
        return (this.map.get(item) || 0) > 0;
    }

    getNumberOfCopies(item: T): number {
        return this.map.get(item) ?? 0;
    }
}