export function conditionalNumber<T extends number | string>(value: T extends number ? number : string): void {
    if (typeof value === "number") {
        console.log(value.toFixed(2));
    } else {
        console.log(value);
    }
}

type InputParamType<T> = T extends number ? number : string;
export function conditionalNumber2<T>(value: InputParamType<T>): void {
    if (typeof value === "number") {
        console.log(value.toFixed(2));
    } else {
        console.log(value);
    }
}