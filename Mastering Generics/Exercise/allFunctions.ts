type AllFunctions<T> = {
    [K in keyof T as T[K] extends (...args: any[]) => any ? K : never]: T[K];
};

type AllFunctions2<T> = {
    [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type AllFunctions3<T> = Pick<T, AllFunctions2<T>>; //copy all properties from T into a new type AllFunctions3<T> - key + value