import { IPerson } from '../models/IPerson';
import { httpService } from './http.service';

const areObjEqual = require('../utils/areObjEqual');

const htServ = new httpService();

export class personsService {
  pServ: personsService;
  htServ = new httpService();
  persons: Array<IPerson> = [];
  observerList: Array<any> = [];

  subscribe = (obj: any) => {
    obj.obsId = this.observerList.length;
    return this.observerList.push(obj);
  };

  notifyAll = () =>{
    console.log('notify persons: ', this.persons)
    for(var i=0; i < this.observerList.length; i++){
      this.observerList[i](this.persons);
    }
  }

  updatePersons() {
    return htServ.getPersons()
    .then(data => {
      if(data.persons) {
        this.persons = [...data.persons];
        return this.persons;
      }
    });
  }

  getPersons() {
    return [...this.persons];
  }

  addPerson(person: IPerson) {
    let updPersons = [];
    if (this.persons.length > 0) {
      updPersons = [...this.persons];
      const pIndex = updPersons.findIndex(p=> areObjEqual(p, person));
      if (pIndex === -1) {
        updPersons.push(person);
      }
      this.persons = updPersons;
      this.notifyAll();
    } else {
      updPersons.push(person);
    }
    htServ.addPerson(person);
  }

  getPerson(id: string) {
    if (this.persons.length > 0) {
      const person = this.persons.filter(p => p.id === `${id}` )[0];
      return person;
    }
  }

  deletePerson(id: string) {
    let persons;
    if (this.persons.length > 0) {
      persons = [...this.persons];
      const newPersons = persons.filter(p => p.id !== id);
      this.persons = newPersons;
      htServ.deletePerson(id);
    }
    this.notifyAll();
  }
}