function Validate(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function(this: any, ...args: any[]) {
        for (const arg of args) {
            if (typeof arg !== 'number') {
                throw new Error(`Invalid argument type. Arguments must be numbers.`);
            }
        }
        return originalMethod.apply(this, args);
    };
    return descriptor;
}

class Calculator {
    @Validate
    add(a: any, b: any) {
        return a + b;
    }
}

const calc = new Calculator();
console.log(calc.add(2, 3)); // Output: 5
console.log(calc.add('2', 3)); // Throws Error: Invalid argument type. Arguments must be numbers.
