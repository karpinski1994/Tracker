import { IPerson } from '../models/IPerson';
import { Injectable, Inject } from '../di/DIContainer';

@Injectable
export class httpService {

  constructor() {
    console.log('tworze httpService');
  }

  addPerson(person: IPerson) {
    return fetch(`http://localhost:3000/api/person/add`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, same-origin, *omit
      headers: {
          "Content-Type": "application/json; charset=utf-8",
          // "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(person), // body data type must match "Content-Type" header
    })
  }

  getPersons() {
    return fetch('http://localhost:3000/api/person/list')
    .then((response) => response.json());
  }

  getPerson(id: string) {
    return fetch(`http://localhost:3000/api/person/get/${id}`)
      .then((response) => response.json());
  }

  deletePerson(id:string) {
    fetch(`http://localhost:3000/api/person/delete/${id}`, {method: 'DELETE'})
      .then((response) => response.json())
  }

  activateWalking() {
    fetch('http://localhost:3000/api/person/mode/walking',
    {method: 'PUT'});
  }

  disactivateWalking() {
    fetch('http://localhost:3000/api/person/mode/stationary',
    {method: 'PUT'});
  }

}