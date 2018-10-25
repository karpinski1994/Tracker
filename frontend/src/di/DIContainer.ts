const areObjEqual = require('../utils/areObjEqual');

interface Container {
  registered: [];
  instances: [];
}

class Container {

  constructor() {
    this.registered = [];
    this.instances = [];
    this.solved = [];
  }

  register(target: any, dependency?: string) {
    if (dependency) {
      const curTarget: any = this.registered.find(el => areObjEqual(el, target));
      if(curTarget) {
        // jesli klasa juz jest to dodajemy do niej sama zaleznosc
        if (curTarget.dependencies) {
          // sprawdzamy czy juz ma jakies zaleznosci
          curTarget.dependencies.unshift(dependency);
        }
        else {
          curTarget.dependencies = [];
          curTarget.dependencies.unshift(dependency);
        }
      } else {
        // jesli nie ma klasy to dodajemy ja z zaleznoscia
        this.registered.unshift(target);
        const curTarget: any = this.registered.find(el => areObjEqual(el, target));
        curTarget.dependencies = [];
        curTarget.dependencies.unshift(dependency);
      }
    } else {
      this.registered.unshift(target);
    }


  }

  initiate() {

    this.registered.map(registredElemenet => {
      this.hasDeps(registredElemenet)

      // if (this.hasDeps(registredElemenet)) {
      //   let dependency;
      //   registredElemenet.dependencies.forEach(depName => {
      //     dependency = this.registered.find(dep => dep.name === depName);
      //     this.instances.push(new dependency());
      //   });
      //   console.log(dependency)
      //   console.log('this.instances', this.instances)
      // }
    });
  }

  hasDeps(element) {
    console.log('element', element.name)
    if(element.dependencies) {
      element.dependencies.forEach(depName => {
        const dependency = this.registered.find(d => d.name === depName)
        console.log('dep', dependency)
        this.hasDeps(dependency)
      });
    } else {
      console.log('bla')
    }
  }

}

export const diContainer = new Container();

export const Inject = (serviceName: any) => {
  return (target: any) => {
    diContainer.register(target, serviceName);
    return target;
  }
};

export const Injectable = (target: any) => {
  diContainer.register(target);
  return target;
};