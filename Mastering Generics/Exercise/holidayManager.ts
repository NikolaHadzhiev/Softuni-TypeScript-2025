enum TravelVacation {
    Abroad = 'Abroad',
    InCountry = 'InCountry'
}

enum MountainVacation {
    Ski = 'Ski',
    Hiking = 'Hiking'
}

enum BeachVacation {
    Pool = 'Pool',
    Sea = 'Sea',
    ScubaDiving = 'ScubaDiving'
}

interface Holiday {
    set start(val: Date);
    set end(val: Date);
    getInfo(): string;
}

interface VacationManager<T, V> {
    reserveVacation(holiday: T, vacationType: V): void;
    listReservations(): string;
}

class PlannedHoliday implements Holiday {
    private _start!: Date;
    private _end!: Date;

    constructor(start: Date, end: Date) {
        this.start = start;
        this.end = end;
    }

    set start(val: Date) {
        if (this._end && val > this._end) throw new Error('Start date cannot be after end date');
        this._start = val;
    }

    set end(val: Date) {
        if (this._start && val < this._start) throw new Error('End date cannot be before start date');
        this._end = val;
    }

    getInfo(): string {
        const format = (d: Date) => `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
        return `Holiday: ${format(this._start)} - ${format(this._end)}`;
    }
}

class HolidayManager<T extends Holiday, V extends TravelVacation | MountainVacation | BeachVacation> implements VacationManager<T, V> {
    private reservations: Map<T, V> = new Map();

    reserveVacation(holiday: T, vacationType: V): void {
        this.reservations.set(holiday, vacationType);
    }

    listReservations(): string {
        return Array.from(this.reservations.entries())
            .map(([holiday, vacationType]) => `${holiday.getInfo()} => ${vacationType}`)
            .join('\n');
    }
}