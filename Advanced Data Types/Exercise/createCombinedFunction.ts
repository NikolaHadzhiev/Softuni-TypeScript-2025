type NameInfo = { fName: string, lName: string, age: number, getPersonInfo(): string };
type LocationInfo = { city: string, street: string, number: number, postalCode: number, getAddressInfo(): string };

export function createCombinedFunction(name: NameInfo, location: LocationInfo) {
    return (combined: NameInfo & LocationInfo) => {
        console.log(`Hello, ${combined.getPersonInfo()} from ${combined.getAddressInfo()}`);
    };
}