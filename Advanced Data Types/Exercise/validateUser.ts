type User = {
    id: number | string,
    username: string,
    passwordHash: string | string[],
    status: 'Locked' | 'Unlocked' | 'Deleted',
    email?: string
};

export function isValidUser(obj: any): obj is User {
    const validId = typeof obj.id === 'number' ? obj.id > 100 : typeof obj.id === 'string' && obj.id.length === 14;
    const validUsername = typeof obj.username === 'string' && obj.username.length >= 5 && obj.username.length <= 10;
    const validPassword = typeof obj.passwordHash === 'string'
        ? obj.passwordHash.length === 20
        : Array.isArray(obj.passwordHash) && obj.passwordHash.length === 4 && obj.passwordHash.every(p => p.length === 8);
    const validStatus = ['Locked', 'Unlocked'].includes(obj.status);
    return validId && validUsername && validPassword && validStatus;
}