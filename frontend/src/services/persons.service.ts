import { IPerson } from '../models/IPerson';
import { Inject } from '../di/DIContainer';

const areObjEqual = require('../utils/areObjEqual');

@Inject('httpService')
@Inject('helperService')
@Inject('testService')
export class personsService {

  constructor( private tServ: any, private helperService: any, private htServ: any,){}

  pServ: personsService;
  persons: Array<IPerson> = [];
  observerList: Array<any> = [];

  // subscribe = (obj: any) => {
  //   obj.obsId = this.observerList.length;
  //   return this.observerList.push(obj);
  // }

  // notifyAll = () => {
  //   for(var i=0; i < this.observerList.length; i++){
  //     this.observerList[i](this.persons);
  //   }
  // }

  //  *
  updatePersons() {
    return this.htServ.getPersons()
    .then((data: any) => {
      if(data.persons) {
        this.persons = [...data.persons];
        return this.persons;
      }
    });
  }

  //  *
  addPerson(person: IPerson) {
    let updPersons = [];
    if (this.persons.length > 0) {
      updPersons = [...this.persons];
      const pIndex = updPersons.findIndex(p=> areObjEqual(p, person));
      if (pIndex === -1) {
        updPersons.push(person);
      }
    } else {
      updPersons.push(person);
    }
    this.persons = updPersons;
    // this.notifyAll();
    this.htServ.addPerson(person);
  }

  // *
  getPersons(): IPerson[] {
    return [...this.persons];
  }

  // *
  getPerson(id: string): IPerson {
    if (this.persons.length > 0) {
      const person = this.persons.filter(p => p.id === `${id}` )[0];
      return person;
    }
    // to wypadałoby obsłużyć jakoś
    // ale to stara funkcja sprzed czasow socket.io
  }

  // *
  deletePerson(id: string) {
    let persons;
    if (this.persons.length > 0) {
      persons = [...this.persons];
      const removedPersonIndex = persons.findIndex(p => p.id === id);
      persons.splice(removedPersonIndex, 1);

      this.persons = persons;
      this.htServ.deletePerson(id);
    }
    // this.notifyAll();
  }

  // *
  setWalking() {
    this.htServ.activateWalking();
  }

  // *
  unsetWalking() {
    this.htServ.disactivateWalking();
  }
}