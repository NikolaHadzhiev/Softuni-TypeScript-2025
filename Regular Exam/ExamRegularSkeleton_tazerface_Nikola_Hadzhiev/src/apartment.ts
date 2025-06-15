import { Room } from "./contracts/room.js";
import { RoomNumber } from "./types.js";

export class Apartment implements Room {
    public readonly roomNumber: RoomNumber;
    private price: number;
    private numberOfGuests: number;

    constructor(price: number, roomNumber: RoomNumber, numberOfGuests: number) {
        this.price = price;
        this.roomNumber = roomNumber;
        this.numberOfGuests = numberOfGuests;
    }

    public get totalPrice(): number {
        return this.numberOfGuests * this.price;
    }

    public get cancellationPrice(): number {
        return this.totalPrice * 0.8;
    }
}