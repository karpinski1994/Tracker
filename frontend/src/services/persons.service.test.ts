// const PersonsService  = require('./persons.service');

import {personsService} from './persons.service';
import { IPerson } from '../models/IPerson';

const fetchedUsers = [
  {
    id: 'adssad',
    name: 'Tomek Kowalski',
    location: {lat: 0, lng: 0},
    direction: 0
  },
  {
    id: '123asd',
    name: 'Maria Nowak',
    location: {lat: 0, lng: 0},
    direction: 0
  }
];

const httpService = {
  activateWalking() {},
  disactivateWalking() {},
  addPerson(person: IPerson) {},
  deletePerson(id: string) {},
  getPersons() {
    return fetch('http://localhost:3000/api/person/list')
    .then((response) => response.json())
    .then((data: any) => {
      if(data.persons) {
        this.persons = [...data.persons];
        return this.persons;
      }
    });
  }
};

const instance = new personsService({}, {}, httpService);

const examplePersons = [
  {
    id: '123213',
    name: 'example name',
    location: {lat: 0, lng: 0},
    direction: 0
  }
];
instance.persons = examplePersons;

describe('PersonsService', () => {
  jest.spyOn(instance, 'getPerson');
  jest.spyOn(instance, 'getPersons');
  jest.spyOn(instance, 'notifyAll');
  jest.spyOn(instance, 'updatePersons');
  jest.spyOn(httpService, 'activateWalking');
  jest.spyOn(httpService, 'disactivateWalking');
  jest.spyOn(httpService, 'addPerson');
  jest.spyOn(httpService, 'deletePerson');

  //  addPerson
  it('Expect to call htServ.addPerson', () => {
    instance.addPerson(
      {
        id: '231321',
        name: 'test name',
        location: {lat: 1, lng: 1},
        direction: 1
      }
    );
    expect(instance.persons).toEqual([
      {
        id: '123213',
        name: 'example name',
        location: {lat: 0, lng: 0},
        direction: 0
      },
      {
        id: '231321',
        name: 'test name',
        location: {lat: 1, lng: 1},
        direction: 1
      }
    ])
    expect(instance.notifyAll).toHaveBeenCalled();
    expect(httpService.addPerson).toHaveBeenCalled();
    expect(httpService.addPerson).toHaveBeenCalledWith({
      id: '231321',
      name: 'test name',
      location: {lat: 1, lng: 1},
      direction: 1
    });
  });

  // deletePerson
  it('Expect to delete person', () => {
    instance.deletePerson('231321');
    expect(instance.persons).toEqual([
      {
        id: '123213',
        name: 'example name',
        location: {lat: 0, lng: 0},
        direction: 0
      }
    ])
    expect(httpService.deletePerson).toHaveBeenCalled();
    expect(httpService.deletePerson).toHaveBeenCalledWith('231321');
    expect(instance.notifyAll).toHaveBeenCalled();
  });

  //  updatePersons
  it('Expect to update persons', () => {
    instance.updatePersons();
    expect(instance.updatePersons).toReturn();
  })

  //  getPersons
  it('Expect to return persons', () => {
    const returnedValue = instance.getPersons();
    expect(instance.getPersons).toReturn();
    expect(returnedValue).toEqual(instance.persons);
  });

  //  getPerson
  it('Expect to return person', () => {
    const returnedValue = instance.getPerson('123213');
    expect(instance.getPerson).toReturn();
    expect(returnedValue).toEqual({
      id: '123213',
      name: 'example name',
      location: {lat: 0, lng: 0},
      direction: 0
    });
  });

   //  getPerson - co tu zrobić w persons.service if
   it('Expect to return undefined when given empty string', () => {
    const returnedValue = instance.getPerson('');
    expect(returnedValue).toBeUndefined();
  });

  //  setWalking
  it('Expect httpService.activateWalking to be called on personsService.setWalking invocation.', () => {
    instance.setWalking();
    expect(httpService.activateWalking).toHaveBeenCalled();
  })

  //  unsetWalking
  it('Expect httpService.disactivateWalking to be called on personsService.unsetWalking invocation.', () => {
   instance.unsetWalking()
   expect(httpService.disactivateWalking).toHaveBeenCalled();
  })
});