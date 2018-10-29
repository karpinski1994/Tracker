
interface IInstance {
  name?: string;
  instance?: object;
}

interface IItem {
  name?: string;
  deps?: string[];
  depsQueue?: string[];
  class?: object
}

interface Container {
  queue: Array<IItem>;
  instances: Array<IInstance>;
}

class Container {

  constructor() {
    this.queue = [];
    this.instances = [];
  }

  register(target: any, depName?: string) {
    let found : IItem;
    if (this.queue.length > 0) {
      found = this.queue.find((t:any) => t.name === target.name);
    }
    if (found) {
      found.deps.push(depName);
      found.depsQueue.push(depName);
    } else {
      const newItem: IItem = {
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

    if(target.deps) {
      target.deps.push(depName);
    } else {
      target.deps = [];
      target.deps.push(depName);
    }
    return target;
  }

  getInstances() {
    const curInstances = [...this.instances];
    const obj = {};
    curInstances.forEach(i => obj[`${i.name}`] = i.instance);
    return obj;
  }

  getInstance(name: string) {
    const instance = this.instances.find(i => i.name === name);
    return instance;
  }

  initiate() {
    //pozniej na while queue lenght > 0
    let iteration = 0;
    let circularImplemented;
    while (this.queue.length > 0 && !circularImplemented) {
      const befIterQueNo = this.queue.length;
      this.queue.forEach((item: IItem, index) => {
        if(item.depsQueue.length === 0) {
          this.instances.push(
            {
              name: item.name,
              instance: new item.class()
            }
          );
          iteration += 1;
          this.queue.splice(index, 1);
        } else {
          let instancesToInject: any[] = [];
          item.deps.forEach((depName:string, index) => {
            const instanceToInject: IInstance = this.instances.find((ins:IInstance) => ins.name === depName);
            if (instanceToInject) {
              instancesToInject.push(instanceToInject.instance);
              item.depsQueue.splice(index, 1);
            }
          });
          if(instancesToInject.length === item.deps.length) {
            this.instances.push(
              {
                name: item.name,
                instance: new item.class(...instancesToInject)
              }
            );
            iteration += 1;
            const fIndex = this.queue.findIndex(i => i === item);
            if (fIndex !== -1) {
              this.queue.splice(fIndex, 1);
            }
          }
        }
      })
      const afIterQueNo = this.queue.length;
      circularImplemented = befIterQueNo === afIterQueNo;
    }
    if(circularImplemented) {
      console.log('THERE\'S A CIRCULAR DEPENDENCY IMPLEMENTED!')
    }
    return true;
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