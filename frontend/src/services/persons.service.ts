import { IPerson } from '../models/IPerson';
import { httpService } from './http.service';
import { PersonsList } from '../components/persons/PersonsList';

const areObjEqual = require('../utils/areObjEqual');

const htServ = new httpService();

export class personsService {
  pServ: personsService;
  htServ = new httpService();
  persons: Array<IPerson> = [];
  observerList: Array<any> = [];

  addObserver = (obj: any) => {
    obj.obsId = this.observerList.length;
    return this.observerList.push(obj);
  };

  notify = (msg: any) =>{
    for(var i=0; i < this.observerList.length; i++){
      this.observerList[i].update(msg);
    }
  }

  updatePersons() {
    return htServ.getPersons()
    .then(data => {
      this.persons = [...data.persons];
      console.log('persons.service this.persons:', this.persons)
      return this.persons;
    });
  }

  getPersons() {
    return [...this.persons];
  }

  addPerson(person: IPerson) {
    if (this.persons.length > 0) {
      const updPersons = [...this.persons];
      const pIndex = updPersons.findIndex(p=> areObjEqual(p, person));
      if (pIndex === -1) {
        updPersons.slice(pIndex, 1);
      }
      this.persons = updPersons;
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
    if (this.persons.length > 0) {
      const persons = [...this.persons];
      persons.filter(p => p.id !== id);
      this.persons = persons;
      htServ.deletePerson(id);
    }
  }
}