function LogMethod(target: any, methodName: string, descriptor: PropertyDescriptor) {
    console.log("target :", target);
    console.log("descriptor :", descriptor);
    const originalMethod = descriptor.value;
    descriptor.value = function(...args: any[]) {
        console.log(`Calling method: ${methodName}`);
        const result = originalMethod.apply(this, args);
        console.log(`Method ${methodName} executed successfully`);
        return result;
    };
    return descriptor;
}

class Logmethod {
    @LogMethod
    greet(name: string) {
        console.log(`Hello, ${name}!`);
    }
}

const logmethod = new Logmethod();
logmethod.greet('Alice'); // Output: Calling method: greet, Hello, Alice!, Method greet executed successfully
