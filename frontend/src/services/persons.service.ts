import { IPerson } from '../models/IPerson';
import { httpService } from './http.service';

export class personsService {

  htServ = new httpService();
  persons: Array<IPerson> = [];

  updatePersons() {
    return this.htServ.getPersons()
    .then(data => {
      this.persons = [...data.persons];
      console.log('persons.service after fetch: ', this.persons);
      return this.persons;
    });
  }

  getPersons() {
    return [...this.persons];
  }

  addPerson(person: IPerson) {
    this.htServ.addPerson(person);
  }

  getPerson(id: number) {
    if (this.persons.length > 0) {
      const person = this.persons.filter(p => p.id === `${id}` )[0];
      return person;
    }
  }

  deletePerson(id: number) {
    if (this.persons.length > 0) {
      const persons = [...this.persons];
      persons.filter(p => p.id !== `${id}`);
      this.persons = persons;
      this.htServ.deletePerson(id);
    }
  }

}