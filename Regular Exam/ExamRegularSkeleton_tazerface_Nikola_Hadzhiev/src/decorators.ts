export function decorator1<T extends new (...args: any[]) => {}>(constructor: T) {
    return constructor;
}

export function decorator2(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.get;
    descriptor.get = function() {
        const originalValue = originalMethod?.call(this);
        return originalValue * 1.2; // 120% of original price
    };
}

export function decorator3(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.get;
    descriptor.get = function() {
        const originalValue = originalMethod?.call(this);
        return originalValue * 1.2; // 120% of original price
    };
}

export function decorator4(target: any, propertyKey: string | symbol | undefined, parameterIndex: number) {

}

export function decorator5<T extends abstract new (...args: any[]) => {}>(constructor: T) {
    abstract class PartialMonthlyMotel extends constructor {
        public static readonly MotelName: string = "Monthly Motel";
    }

    return PartialMonthlyMotel;
}