interface CarStructure {
    engine: {
        horsepower: number;
    };
    tires: {
        model: string;
        airPressure: number;
    };
    body: {
        material: string;
    };
}

export class Mechanic<T extends CarStructure> {
    technicalInspection(car: T): boolean {
        return true;
    }
}