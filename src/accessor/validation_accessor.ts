function validateAge(target: any, propertyKey: string) {
    let value = target[propertyKey];
  
    const getter = function () {
      return value;
    };
  
    const setter = function (newVal: number) {
      if (newVal < 0 || newVal > 120) {
        throw new Error("Age must be between 0 and 120");
      }
      value = newVal;
    };
  
    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  }
  
  class User {
    @validateAge
    private _age: number;
  
    constructor(age: number) {
      this._age = age;
    }
  
    get age(): number {
      return this._age;
    }
  
    set age(value: number) {
      this._age = value;
    }
  }
  
  const user = new User(25);
  console.log(user.age);
  user.age = 130; // Throws an error
  