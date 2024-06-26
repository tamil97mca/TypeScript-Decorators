function Memoize(target: any, methodName: string, descriptor: PropertyDescriptor) {
    console.log("memoize");
    const originalMethod = descriptor.value;
    const cache = new Map<string, any>(); // Map to store cached values

    // Function to set a value in the cache
    function setCacheValue(cacheKey: string, value: any) {
        cache.set(cacheKey, value);
        console.log(`Value ${value} cached for key ${cacheKey}`);
    }

    // Function to get a value from the cache
    function getCacheValue(cacheKey: string) {
        if (cache.has(cacheKey)) {
            const cachedValue = cache.get(cacheKey);
            console.log(`Value ${cachedValue} retrieved from cache for key ${cacheKey}`);
            return cachedValue;
        }
        return null; // Return null if value not found in cache
    }

    console.log("Before");
    descriptor.value = function(...args: any[]) {
        console.log("After");
        const cacheKey = args.join('-');
        console.log(`Computing value for key ${cacheKey}`);

        const cachedValue = getCacheValue(cacheKey);
        if (cachedValue !== null) {
            return cachedValue; // Return cached value if available
        }

        const result = originalMethod.apply(this, args);
        setCacheValue(cacheKey, result); // Cache the result
        return result;
    };

    return descriptor;
}

class Caching {
    @Memoize
    expensiveOperation(n: number) {
        console.log(`Executing expensive operation for ${n}`);
        return n * 2;
    }
}

// const caching = new Caching();
// console.log(caching.expensiveOperation(5)); // Output: Executing expensive operation for 5, Value 10 cached for key 5
// console.log(caching.expensiveOperation(8)); // Output: Value 10 retrieved from cache for key 5
