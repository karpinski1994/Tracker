import { IPerson } from '../models/IPerson';

export class httpService {

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
      .then(response => response.json())
      .then(bla => console.log(bla)); // parses response to JSON
  }

  getPersons() {
    return fetch('http://localhost:3000/api/person/list')
    .then((response) => response.json());
  }

  getPerson(id: number) {
    return fetch(`http://localhost:3000/api/person/get/${id}`)
      .then((response) => response.json());
  }

  deletePerson(id:number) {
    fetch(`http://localhost:3000/api/person/delete/${id}`)
      .then((response) => response.json())
      .then((responseJSON) => {
        console.log(responseJSON);
      });
  }

}