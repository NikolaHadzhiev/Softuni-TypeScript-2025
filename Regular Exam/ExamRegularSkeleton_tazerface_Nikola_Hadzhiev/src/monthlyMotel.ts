import { PartialMonthlyMotel } from "./contracts/partialMonthlyMotel.js";
import { Room } from "./contracts/room.js";
import { WinterMonth, SummerMonth } from "./contracts/util.js";
import { BookingRecord, Bookings, Month, RoomNumber, Rooms } from "./types.js";

export class MonthlyMotel<T extends WinterMonth | SummerMonth> extends PartialMonthlyMotel {
    private rooms: Rooms = new Map();
    private bookings: Bookings = new Set();
    private allBookingRecords: BookingRecord<T>[] = [];
    private cancelledBookings: BookingRecord<T>[] = [];

    public override addRoom(room: unknown): string {
        if (!room || typeof room !== 'object' || 
            !('roomNumber' in room) || !('totalPrice' in room) || !('cancellationPrice' in room)) {
            return "Value was not a Room.";
        }

        const roomObj = room as Room;
        
        if (this.rooms.has(roomObj.roomNumber)) {
            return `Room '${roomObj.roomNumber}' already exists.`;
        }

        this.rooms.set(roomObj.roomNumber, roomObj);
        return `Room '${roomObj.roomNumber}' added.`;
    }

    public override bookRoom(roomNumber: RoomNumber, bookedMonth: Month<T>): string {
        if (!this.rooms.has(roomNumber)) {
            return `Room '${roomNumber}' does not exist.`;
        }

        const bookingKey = `${roomNumber}-${bookedMonth}`;
        
        if (this.bookings.has(bookingKey)) {
            return `Room '${roomNumber}' is already booked for '${bookedMonth}'.`;
        }

        this.bookings.add(bookingKey);
        const room = this.rooms.get(roomNumber)!;
        this.allBookingRecords.push({
            month: bookedMonth,
            room
        });

        return `Room '${roomNumber}' booked for '${bookedMonth}'.`;
    }

    public override cancelBooking(roomNumber: RoomNumber, bookedMonth: Month<T>): string {
        if (!this.rooms.has(roomNumber)) {
            return `Room '${roomNumber}' does not exist.`;
        }

        const bookingKey = `${roomNumber}-${bookedMonth}`;
        
        if (!this.bookings.has(bookingKey)) {
            return `Room '${roomNumber}' is not booked for '${bookedMonth}'.`;
        }

        this.bookings.delete(bookingKey);
        
        const bookingIndex = this.allBookingRecords.findIndex(
            booking => booking.room.roomNumber === roomNumber && booking.month === bookedMonth
        );
        
        if (bookingIndex !== -1) {
            const cancelledBooking = this.allBookingRecords[bookingIndex];
            this.cancelledBookings.push(cancelledBooking);
        }

        return `Booking cancelled for Room '${roomNumber}' for '${bookedMonth}'.`;
    }

    public override getTotalBudget(): string {
        let total = this.allBookingRecords.reduce((sum, booking) => sum + booking.room.totalPrice, 0);

        total -= this.cancelledBookings.reduce((sum, booking) => sum + booking.room.cancellationPrice, 0);

        return `${super.getTotalBudget()}\nTotal budget: $${total.toFixed(2)}`;
    }
}