function logPropertyAccess(target: any, propertyKey: string) {
    const privatePropKey = `_${propertyKey}`;
  
    const descriptor: PropertyDescriptor = {
      get: function getter(this: any) {
        console.log(`Getting value of ${propertyKey}: ${this[privatePropKey]}`);
        return this[privatePropKey];
      },
      set: function setter(this: any, newVal: any) {
        console.log(`Setting value of ${propertyKey} to ${newVal}`);
        this[privatePropKey] = newVal;
      },
      enumerable: true,
      configurable: true
    };
  
    Object.defineProperty(target, propertyKey, descriptor);
  }
  
  class Product {
    @logPropertyAccess
    private _price: number;
  
    constructor(price: number) {
      this._price = price;
    }
  
    get price(): number {
      return this._price;
    }
  
    set price(value: number) {
      this._price = value;
    }
  }
  
  const product = new Product(50);
  console.log(product.price); // Logs "Getting value of price: 50", returns 50
  product.price = 60; // Logs "Setting value of price to 60"
  console.log(product.price); // Logs "Getting value of price: 60", returns 60
  