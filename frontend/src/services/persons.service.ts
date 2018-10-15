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
    console.log('persons.service getPersons() persons', this.persons);
    return [...this.persons];
  }

  getPerson(id: number) {
    // let person;
    // let loaded = false;
    // if (this.persons.length > 0) {
      console.log(this.persons)
      this.persons.forEach(p => console.log( p.id !== `${id}` ));
      // loaded = true;
    // } else {
    //   this.htServ.getPerson(id)
    //     .then(data => {
    //       person = data.person;
    //       loaded = true;
    //     })
    // }
    // if(loaded) {
    //   return person;
    // }
  }

}