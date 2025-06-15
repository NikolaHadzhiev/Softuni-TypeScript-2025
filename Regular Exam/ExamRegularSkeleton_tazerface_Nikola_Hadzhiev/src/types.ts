import { Room } from "./contracts/room";
import { SummerMonth, WinterMonth } from "./contracts/util";

export type RoomNumber = 'A01' | 'A02' | 'A03' | 'B01' | 'B02' | 'B03';
export type Rooms = Map<RoomNumber, Room>;
export type Month<T> = T extends WinterMonth ? WinterMonth : SummerMonth;
export type Bookings = Set<string>;
export type BookingRecord<T> = {
    month: Month<T>;
    room: Room;
};
