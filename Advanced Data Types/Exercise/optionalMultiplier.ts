export function optionalMultiplier(a?: string | number, b?: string | number, c?: string | number): number {
    const values = [a, b, c].map(val => {
        if (val === undefined) return 1;
        return typeof val === 'string' ? parseInt(val) : val;
    });
    return values.reduce((acc, val) => acc * val, 1);
}