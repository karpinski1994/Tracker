const areObjEqual = require('../utils/areObjEqual');

interface Container {
  queue: Array<object>;
  instances: Array<object>;
  solved: Array<object>;
}

class Container {

  constructor() {
    this.queue = [];
    this.classes = [];
    this.solved = [];
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
    this.queue.forEach(item => {
      if(item.deps.length === 0) {
        this.classes.push(item.class);
        const fIndex = this.queue.findIndex(i => i === item);
        if(fIndex !== -1){
          this.queue.splice(fIndex, 1);
        }
      } else {
        item.deps.forEach(dep => {
          console.log('dep', dep);
          this.classes.forEach(c => console.log('d: ',c.name))
        });
      }
    })
    console.log('this.classes', this.classes);
    console.log('this.queue', this.queue);
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