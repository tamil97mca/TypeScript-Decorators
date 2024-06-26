function Authenticated(userName: string ,authenticatedKey: string, dummy: string) {
    console.log('1) userName', userName);
    console.log('2) authenticatedKey', authenticatedKey);
    console.log('3) dummy', dummy);
    return function(target: any, methodName: string, descriptor: PropertyDescriptor) {
        console.log("target", target);
        console.log("methodName", methodName);
        const originalMethod = descriptor.value;
        descriptor.value = function(this: any, ...args: any[]) {
            if (this[authenticatedKey]) {
                console.log("Success", args);
                return originalMethod.apply(this, args);
            } 
            else {
                throw new Error('Unauthorized');
            }
        };
        return descriptor;
    }
}

class Authorization {
    public isAuthenticated: boolean = false;

    @Authenticated('Nelson' ,'isAuthenticated', '33223')
    sensitiveOperation() {
        console.log('Sensitive operation executed');
    }
}

const authorization = new Authorization();
authorization.isAuthenticated = true; // Set to true to authorize
authorization.sensitiveOperation(); // Should succeed now

