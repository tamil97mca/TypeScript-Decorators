function cache(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalGetter = descriptor.get;
  
    const cacheKey = `_${propertyKey}_cache`;
  
    if (typeof originalGetter !== 'function') {
      throw new Error(`Getter function for property ${propertyKey} is undefined.`);
    }
  
    descriptor.get = function (this: typeof CachedData) {
      if (!(this as any)[cacheKey]) {
        (this as any)[cacheKey] = originalGetter.call(this);
      }
      return (this as any)[cacheKey];
    };
  
    return descriptor;
  }
  
  class CachedData {
    private _data: number[];
  
    constructor() {
      this._data = [1, 2, 3, 4, 5];
    }
  
    @cache
    get sum(): number {
      console.log("Calculating sum...");
      return this._data.reduce((acc, curr) => acc + curr, 0);
    }
  }
  
  const data = new CachedData();
  console.log(data.sum); // Logs "Calculating sum..." and returns 15
  console.log(data.sum); // Returns 15 (value is cached)
  