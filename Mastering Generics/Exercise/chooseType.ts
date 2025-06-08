type Choose<T, K extends keyof T> = {
    [P in K]: T[P];
};