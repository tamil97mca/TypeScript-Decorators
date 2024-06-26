// When using multiple decorators, the order in which they are applied is important.
// They are applied from top to bottom but evaluated from bottom to top.

function firstDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
    console.log("firstDecorator");
    return class extends constructor {
      firstDecoratorAddedProperty = "First";
      firstDecoratorAddedMethod() {
        console.log('Method added by firstDecorator');
      }
    }
  }
  
  function secondDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
    console.log("secondDecorator");
    return class extends constructor {
      secondDecoratorAddedProperty = "Second";
      secondDecoratorAddedMethod() {
        console.log('Method added by secondDecorator');
      }
    }
  }
  
  @firstDecorator
  @secondDecorator
  class Multi {
    constructor() {
      console.log('Multi class constructor');
    }
  }
  
  interface Multi {
    firstDecoratorAddedProperty: string;
    firstDecoratorAddedMethod(): void;
    secondDecoratorAddedProperty: string;
    secondDecoratorAddedMethod(): void;
  }
  
  const multi = new Multi();
  console.log(multi.firstDecoratorAddedProperty); // Outputs: First
  console.log(multi.secondDecoratorAddedProperty); // Outputs: Second
  multi.firstDecoratorAddedMethod(); // Outputs: Method added by firstDecorator
  multi.secondDecoratorAddedMethod(); // Outputs: Method added by secondDecorator
  