function log(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    console.log('target', target);
    console.log('propertyKey', propertyKey);
    console.log('descriptor', descriptor);
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        console.log(`Logging parameter for method ${String(propertyKey)}:`, args);
        return originalMethod.apply(this, args);
    };
    return descriptor;
}


class LoggingParameter {
    @log
    greet(message: string) {
        console.log(`Hello, ${message}!`);
    }
}

const loggingParameter = new LoggingParameter();
loggingParameter.greet("World");
