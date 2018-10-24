
interface Container {
  registered: Map<string, any>,
}

class Container {

  constructor() {
    this.registered = new Map();
  }

  register(target: any, dependency?: string) {
    if (dependency) {
      const curTarget = this.registered.get(`${target.name}`);
      if(curTarget) {
        // jesli klasa juz jest to dodajemy do niej sama zaleznosc
        if (curTarget.dependencies) {
          // sprawdzamy czy juz ma jakies zaleznosci
          curTarget.dependencies.push(dependency);
        }
        else {
          curTarget.dependencies = [];
          curTarget.dependencies.push(dependency);
        }
      } else {
        // jesli nie ma klasy to dodajemy ja z zaleznoscia
        this.registered.set(`${target.name}`, target);
        const curTarget = this.registered.get(`${target.name}`);
        curTarget.dependencies = [];
        curTarget.dependencies.push(dependency);
      }
    } else {
      this.registered.set(`${target.name}`, target);
    }
  }

  initiate() {
    this.registered.forEach((target: any) => {
      let dependency;
      console.log(target)
      if(target.dependencies) {
        target.dependencies.map((d: any) => {
          dependency = this.registered.get(d);
        });
      }
      target = new target(dependency);
     })
  }

  getDependency(depName: string) {
    return this.registered.get(depName);
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