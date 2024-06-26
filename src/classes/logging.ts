function loggingDecorator(target: any) {
    console.log(`Class decorator called on: ${target.name}`);
    console.log(target);
  }
  
  @loggingDecorator
  class Logging {
    public name: string;
  
    constructor(name: string) {
      this.name = name;
    }
  }
  
  const logging = new Logging("TypeScript");
  