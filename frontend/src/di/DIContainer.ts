const areObjEqual = require('../utils/areObjEqual');

interface Container {
  queue: Array<object>;
  instances: Array<object>;
}

class Container {

  constructor() {
    this.queue = [];
    this.instances = [];
  }

  register(target: any, depName?: string) {
    let found;
    if (this.queue.length > 0) {
      found = this.queue.find(t => t.name === target.name);
    }
    if (found) {
      found.deps.push(depName);
      found.depsQueue.push(depName);
    } else {
      const newItem = {
        name: target.name,
        class: target
      };
      newItem.deps = [];
      newItem.depsQueue = [];
      if(depName !== undefined) {
        newItem.deps = [...newItem.deps, depName]
        newItem.depsQueue = [...newItem.depsQueue, depName]
      }
      this.queue.push(newItem);
    }
  }

  initiate() {
    //pozniej na while queue lenght > 0
    for (let i = 0; i < 10; i++) {
      this.queue.forEach(item => {
        if(item.depsQueue.length === 0) {
          const instI = this.instances.findIndex(i => i instanceof item.class);
          if (instI === -1 ){
            this.instances.push({name: item.name, instance: new item.class()});
            const fIndex = this.queue.findIndex(i => i === item);
            if (fIndex !== -1) {
              this.queue.splice(fIndex, 1);
            }
          } else {
            const fIndex = this.queue.findIndex(i => i === item);
            if (fIndex !== -1) {
              this.queue.splice(fIndex, 1);
            }
          }
        } else {
          let instancesToInject: any[] = [];
          item.deps.forEach(depName => {
            const instanceToInject = this.instances.find(ins => ins.name === depName);
            if (instanceToInject) {
              instancesToInject.push(instanceToInject.instance);
              const depQueueRmvIndex = item.depsQueue.findIndex((iName:string) => iName === depName);
              if(depQueueRmvIndex !== -1) {
                item.depsQueue.splice(depQueueRmvIndex, 1);
              }
            }
          });

          if(instancesToInject.length === item.deps.length) {
            console.log('ITEM: ', item, 'INSTANCES TO INJECT: ', instancesToInject);
            this.instances.push({name: item.name, instance: new item.class(...instancesToInject)});

            const fIndex = this.queue.findIndex(i => i === item);
            if (fIndex !== -1) {
              this.queue.splice(fIndex, 1);
            }
          } else {
            console.log('ELSE !!!!!!!!!! ITEM: ', item, 'INSTANCES TO INJECT: ', instancesToInject);
          }

        }
      })
    }
    //console.log('----------------------------')
    console.log('this.instances', this.instances);
   console.log('this.queue', this.queue);
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