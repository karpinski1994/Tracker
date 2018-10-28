const areObjEqual = require('../utils/areObjEqual');

interface Container {
  queue: Array<object>;
  solved: Array<object>;
  instances: Array<object>;
}

class Container {

  constructor() {
    this.queue = [];
    this.solved = [];
    this.instances = [];
  }

  register(target: any, depName?: string) {
    let found;
    if (this.queue.length > 0) {
      found = this.queue.find(t => t.name === target.name);
    }
    if (found) {
      found.deps.push(depName);
    } else {
      const newItem = {
        name: target.name,
        class: target
      };
      newItem.deps = [];
      if(depName !== undefined) {
        newItem.deps = [...newItem.deps, depName]
      }
      this.queue.push(newItem);
    }
  }

  // get(name: string) {
  //   const found = this.solved.find(s => s.name === name);
  //   return (found && found.instance) || null;
  // }

  initiate() {
    //pozniej na while queue lenght > 0
    for (let i = 0; i < 10; i++) {
      this.queue.forEach(item => {
        console.log('ITEM:', item)
        if(item.deps.length === 0) {
          const instI = this.instances.findIndex(i => i instanceof item.class);
          if (instI === -1 ){
            this.instances.push(new item.class());
            this.solved.push(item);
            const fIndex = this.queue.findIndex(i => i === item);
            if (fIndex !== -1) {
              this.queue.splice(fIndex, 1);
            }
          } else {
            this.solved.push(item);
            const fIndex = this.queue.findIndex(i => i === item);
            if (fIndex !== -1) {
              this.queue.splice(fIndex, 1);
            }
          }
        } else {
          item.deps.forEach(depName => {
            const fDepInstanceIndex = this.solved.findIndex(s => s.name === depName);
            // sprawdzamy zaleznosc czy ma instancje
            // jesli ma
            if (fDepInstanceIndex !== -1) {
              console.log(console.log('instance to inject: ', this.instances[fDepInstanceIndex]));
              const instanceToInject = this.instances[fDepInstanceIndex];
              console.log("INSTANCE TO INJECT:", instanceToInject)
              // powinnismy sprawdzac czy ta zaleznosc ma instancje
              // sprawdzamy czy rodzic ma instancje
              const itemInstanceIndex = this.instances.findIndex(i => i instanceof item.class);
              console.log('itemInstanceIndex', itemInstanceIndex);
              // jesli instancja jest to pushujemy nowa zaleznosc
              if (itemInstanceIndex !== -1) {
                console.log("UWAGA!")
                console.log('INSTANCJA: ', this.instances[itemInstanceIndex]);
                console.log('UWAGA!');
                console.log('ITEM PRZED DEPENDENCY: ', item);
                const rDepI = item.deps.findIndex(d => d.name === depName);
                const removedDep = item.deps.splice(rDepI, 1);
                console.log('UWAGA!');
                console.log('ITEM PO DODANIU DEPENDENCY: ', item);
               // jesli nie ma tworzymy instancje 
              } else {
                const rDepI = item.deps.findIndex(d => d.name === depName);
                const removedDep = item.deps.splice(rDepI, 1);
                this.instances.push(new item.class(instanceToInject));
              }
              
              // console.log('----------------------------')
              
            }
          });
        }
      })
    }
    // console.log('----------------------------')
    console.log('this.solved', this.solved);
    console.log('this.instances', this.instances);
    // console.log('this.queue', this.queue);
  }

  instantiate(element: any) {

  }

}

export const diContainer = new Container();

export const Inject = (depName: any) => {
  return (target: any) => {
    diContainer.register(target, depName);
    return target;
  }
};

export const Injectable = (target: any) => {
  diContainer.register(target);
  return target;
};