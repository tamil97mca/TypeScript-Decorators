interface Modifying {
    newMethod(): void;
  }
  
  function addMethod(target: any) {
    target.prototype.newMethod = function () {
      console.log("New method added by the decorator");
    };
  }
  
  @addMethod
  class Modifying {
    public name: string;
  
    constructor(name: string) {
      this.name = name;
    }
  }
  
  const modifying = new Modifying("TypeScript");
  modifying.newMethod(); // Outputs: "New method added by the decorator"
  