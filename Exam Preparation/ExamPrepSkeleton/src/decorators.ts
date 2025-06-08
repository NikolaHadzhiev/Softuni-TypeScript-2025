export function decorator1<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        protected _offset: number = 3;
    };
}

export function decorator2(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    return descriptor;
}

export function decorator3(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    return descriptor;
}

export function decorator4(target: any): any {
    target.forbiddenSymbols = [...target.forbiddenSymbols, '"', "'"];
    return target;
}
