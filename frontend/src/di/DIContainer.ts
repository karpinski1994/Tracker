
interface Container {
  services: Map<string, any>,
  decorated: Array<any>,
  instances: Array<any>,
}

class Container {

  constructor() {
    this.services = new Map();
    this.instances = [];
  }

  register(service: any) {
    this.services.set(`${service.name}`, service);
    this.instantiateService(service.name);
  }

  instantiateService(name: string) {
    const service = this.services.get(name);
    this.instances = [...this.instances, new service()];
    console.log(this.instances);
    // jesli jest injectable to pierwszy
  }

  logAll() {
    for (var [key, value] of this.services) {
      console.log(`key:${key}======= value: ${value}`);
    }
  }

}

export default Container;