import { IPerson } from '../models/IPerson';
import { httpService } from './http.service';

const htServ = new httpService();

export class personsService {
  pServ: personsService;
  htServ = new httpService();
  persons: Array<IPerson> = [];

  updatePersons() {
    return htServ.getPersons()
    .then(data => {
      this.persons = [...data.persons];
      return this.persons;
    });
  }

  getPersons() {
    return [...this.persons];
  }

  addPerson(person: IPerson) {
    htServ.addPerson(person);
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
      htServ.deletePerson(id);
    }
  }

}