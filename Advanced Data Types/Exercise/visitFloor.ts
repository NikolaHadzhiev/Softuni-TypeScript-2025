type Floor =
    | { number: 1; hallway: 'A' | 'C'; train: () => void; pass?: 'Guest' }
    | { number: 2; hallway: 'A' | 'C'; dine: () => void; pass?: 'Guest' }
    | { number: 3; hallway: 'A' | 'C'; sleep: () => void };

export function visitFloor(floor: Floor) {
    switch (floor.number) {
        case 1: floor.train(); break;
        case 2: floor.dine(); break;
        case 3: floor.sleep(); break;
    }
}