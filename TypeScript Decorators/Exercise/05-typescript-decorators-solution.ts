// ==========================
// TASK 1: Logging Decorator
// ==========================
function log(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
        console.log(`Function '${methodName}' called with arguments: ${args.join(', ')}`);
        return original.apply(this, args);
    };
}

class Person {
    constructor(public fName: string, public lName: string) {}

    @log
    static getFullName(fName: string, lName: string): string {
        return `${fName} ${lName}`;
    }
}

// ============================
// TASK 2: Validate Age Setter
// ============================

function validateAge(target: any, prop: string, descriptor: PropertyDescriptor) {
    const original = descriptor.set!;
    descriptor.set = function (val: number) {
        if (val < 1 || val > 200) throw new Error("Age must be between 1 and 200");
        original.call(this, val);
    };
}

class Age {
    private _age!: number;

    constructor(age: number) {
        this.age = age;
    }

    @validateAge
    set age(val: number) {
        this._age = val;
    }

    get age() {
        return this._age;
    }
}

// ==========================
// TASK 3: CreatedOn Decorator
// ==========================

function createdOn<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        createdOn = new Date();
    };
}

@createdOn
class UserWithCreatedOn {
    constructor(public name: string, public age: number) {}

    displayUserInfo() {
        console.log(`${this.name}, Age: ${this.age}`);
    }
}

// =====================================
// TASK 4: Authorization Decorator
// =====================================

class MockAuthorizationService {
    constructor(private userRole: 'Guest' | 'PersonalDataAdministrator' | 'Admin') {}

    canViewData(property: string) {
        switch (this.userRole) {
            case 'Admin': return true;
            case 'PersonalDataAdministrator': return ['name', 'age'].includes(property);
            default: return false;
        }
    }
}

function authorize(service: MockAuthorizationService) {
    return function (target: any, propKey: string, descriptor: PropertyDescriptor) {
        const original = descriptor.get!;
        descriptor.get = function () {
            if (!service.canViewData(propKey)) {
                throw new Error('You are not authorized to view this information');
            }
            return original.call(this);
        };
    };
}

class UserWithAuth {
    constructor(private _name: string, private _age: number, private _creditCardInformation: string) {}

    @authorize(new MockAuthorizationService('Admin'))
    get name() { return this._name; }

    @authorize(new MockAuthorizationService('Admin'))
    get age() { return this._age; }

    @authorize(new MockAuthorizationService('Admin'))
    get creditCardInformation() { return this._creditCardInformation; }
}

// ======================================
// TASK 5: Weather Data with Caching
// ======================================

function cacheWeatherData(target: any, propKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    let cachedData: any;
    let lastFetched: Date | null = null;

    descriptor.value = function () {
        const now = new Date();
        if (cachedData && lastFetched && (now.getTime() - lastFetched.getTime()) < 5000) {
            console.log('Returned from cache');
            return cachedData;
        }
        cachedData = original.call(this);
        lastFetched = now;
        return cachedData;
    };
}

class MockWeatherDataService {
    private weatherData: string[] = [
        'Sunny 8° to 20°',
        'Partially Cloudy 7° to 19°',
        'Sunny 5° to 18°'
    ];

    addWeatherData(data: string) { this.weatherData.push(data); }

    @cacheWeatherData
    getWeatherData() { return [...this.weatherData]; }
}

// ======================================
// TASK 6: Flexible Validation Decorators
// ======================================

function MinLength(minLength: number) {
    return function (target: any, propKey: string, descriptor: PropertyDescriptor) {
        const original = descriptor.set!;
        descriptor.set = function (val: string) {
            if (val.length < minLength) throw new Error(`name must have a min length of ${minLength} characters`);
            original.call(this, val);
        };
    };
}

function AgeRange(min: number, max: number) {
    return function (target: any, propKey: string, descriptor: PropertyDescriptor) {
        const original = descriptor.set!;
        descriptor.set = function (val: number) {
            if (val < min || val > max) throw new Error(`age must be between ${min} and ${max}`);
            original.call(this, val);
        };
    };
}

function PasswordPattern(regex: RegExp) {
    return function (target: any, propKey: string, descriptor: PropertyDescriptor) {
        const original = descriptor.set!;
        descriptor.set = function (val: string) {
            if (!regex.test(val)) throw new Error(`password needs to match ${regex}`);
            original.call(this, val);
        };
    };
}

class UserValidated {
    private _name!: string;
    private _age!: number;
    private _password!: string;

    constructor(name: string, age: number, password: string) {
        this.name = name;
        this.age = age;
        this.password = password;
    }

    @MinLength(3)
    set name(val: string) { this._name = val; }

    @AgeRange(1, 100)
    set age(val: number) { this._age = val; }

    @PasswordPattern(/^[a-zA-Z0-9]+$/g)
    set password(val: string) { this._password = val; }

    get name() { return this._name; }
    get age() { return this._age; }
}

// =======================================
// TASK 7: Censored Data with Timestamp
// =======================================

class MockCensorService<T extends { [key: string]: any }> {
    constructor(private censoredProperties: string[]) {}

    censorProperties(items: T[]) {
        return items.map(item => {
            const clone = { ...item };
            this.censoredProperties.forEach(prop => delete clone[prop]);
            return clone;
        });
    }
}

function timestampDecoratorFactory(limitMs: number, censorService: MockCensorService<any>, log = false) {
    return function (target: any, propName: string, descriptor: PropertyDescriptor) {
        const original = descriptor.value;
        descriptor.value = function () {
            const now = Date.now();
            if (log) console.log(`Method ${propName} called successfully`);

            const result = original.call(this).filter((item: any) => {
                return now - item.createdOn <= limitMs;
            });

            return censorService.censorProperties(result);
        };
    };
}

class UserCensored {
    public createdOn: number;
    constructor(public name: string, public age: number, public creditCardNumber: string) {
        this.createdOn = Date.now();
    }
    getInfo() {
        return `${this.name}, Age: ${this.age} CreditCardNumber: ${this.creditCardNumber}`;
    }
}

class EmployeeCensored {
    public createdOn: number;
    constructor(public name: string, public birthday: Date, public salary: number) {
        this.createdOn = Date.now();
    }
    getInfo() {
        return `${this.name}, Birthday: ${this.birthday?.toLocaleDateString()} Salary: ${this.salary}`;
    }
}

class UsersService {
    private _users: UserCensored[];
    private _employees: EmployeeCensored[];

    constructor(users: UserCensored[], employees: EmployeeCensored[]) {
        this._users = users;
        this._employees = employees;
    }

    addUser(user: UserCensored) { this._users.push(user); }
    addEmployee(employee: EmployeeCensored) { this._employees.push(employee); }

    @timestampDecoratorFactory(5000, new MockCensorService<UserCensored>(['creditCardNumber']))
    getUsers() { return this._users; }

    @timestampDecoratorFactory(10000, new MockCensorService<EmployeeCensored>(['salary', 'birthday']), true)
    getEmployees() { return this._employees; }
}
