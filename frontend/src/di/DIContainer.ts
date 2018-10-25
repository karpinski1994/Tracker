import { element } from 'protractor';
const areObjEqual = require('../utils/areObjEqual');

interface Container {
  registered: [];
  instances: [];
  solved: [];
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
      this.initDeps(registredElemenet)
        console.log(this.solved)
    });
    
  }


  initDeps(element:any) {
    const prevEl = {...element};
    this.hasDeps(element, prevEl);
  }
  //1 wsadzamy root
  //7 wsadzamy pServ
  hasDeps(element: any, prevEl?: any) {
    let curElement = element;
    //2 root ma zaleznosci wiec idziemy dalej
    //8 pServ ma zaleznosci wiec dalej
      if (curElement.dependencies) {
      //3 pierwsza zaleznosc root to pServ
      //9 zaleznosc pServ to hServ
          curElement.dependencies.forEach((depName :string) => {
        //4 bierzemy pServ
        //10 bierzemy hServ
        const dependency = this.registered.find(d => d.name === depName);
        // * sprawdzamy czy pServ ma instancje
        //5 sprawdzamy czy pServ ma zaleznosci
        //6 ma wiec idziemy do kroku 1
        //11 sprawdzamy czy hServ ma zaleznosci - nie ma wiec return i idziemy dalej
        //12 sprawdzamy czy hServ ma instancje
        let instanceData = this.instances.find(i => i.name === depName);
        //13 ma wiec tworzymy go z zaleznoscia
        if (instanceData) {
          const elWithDep = new curElement(instanceData.instance);
          elWithDep.solved = true;
          this.solved.push(elWithDep);
          this.hasDeps(prevEl);
        } else {
          this.instantiate(dependency);
        }
      });
    } else {
        return
    }
  }

  instantiate(dependency: any) {
      this.instances.push({ name: dependency.name, instance: new dependency()});
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