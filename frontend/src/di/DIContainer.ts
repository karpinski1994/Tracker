
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
  }

  getInstances() {
    const curInstances = [...this.instances];
    const onlyInstances = curInstances.map(i => i.instance);
    return onlyInstances;
  }

  initiate() {
    //pozniej na while queue lenght > 0
    let iteration = 0;
    let circularImplemented = iteration === this.queue.length + 1 ? true : false;
    console.log('circularImplemented', circularImplemented)
    while (this.queue.length > 0 && circularImplemented == false) {
      this.queue.forEach((item: IItem, index) => {
        if(item.depsQueue.length === 0) {
          this.instances.push(
            {
              name: item.name,
              instance: new item.class()
            }
          );
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
            const fIndex = this.queue.findIndex(i => i === item);
            if (fIndex !== -1) {
              this.queue.splice(fIndex, 1);
            }
          }
        }
      })
      iteration += 1;
    }
    if(circularImplemented === true) {
      console.log('THERES A CIRCULAR DEPENDENCY!')
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