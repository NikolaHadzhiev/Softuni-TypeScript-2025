export function operate(param: string | number | string[], operation: 'Index' | 'Length' | 'Add', operand: number): any {
    switch (operation) {
        case 'Index':
            if (typeof param === 'string' || Array.isArray(param)) return param[operand];
            break;
        case 'Length':
            if (typeof param === 'string' || Array.isArray(param)) return param.length % operand;
            break;
        case 'Add':
            return Number(param) + operand;
    }
}