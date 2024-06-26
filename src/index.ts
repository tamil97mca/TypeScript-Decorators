function LogMethods<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        constructor(...args: any[]) {
            super(...args);

            // Iterate over the methods of the class prototype
            for (const methodName of Object.getOwnPropertyNames(constructor.prototype)) {
                if (methodName === 'constructor') continue;

                const originalMethod = (this as any)[methodName];

                // Only wrap functions
                if (typeof originalMethod === 'function') {
                    (this as any)[methodName] = function(...methodArgs: any[]) {
                        // console.log(`Before method: ${methodName}`);
                        if (methodName === 'add') {
                            // console.log("methodArgs :", methodArgs);
                            console.log(`Arguments: ${methodArgs.join(', ')}`);
                        }
                        const result = originalMethod.apply(this, methodArgs);
                        // console.log(`After method: ${methodName}`);
                        if (methodName === 'add') {
                            console.log(`Result: ${result}`);
                        }
                        return result;
                    };
                }
            }
        }
    }
}



@LogMethods
class ExampleClass {
    sayHello(name: string) {
        // console.log(`Hello, ${name}!`);
    }

    add(a: number, b: number) {
        console.log("class add method:", a, b);
        return a + b;
    }
}

// Test the decorated class
const example = new ExampleClass();
example.sayHello('Alice');
example.add(5, 3);
