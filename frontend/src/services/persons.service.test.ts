// const PersonsService  = require('./persons.service');

import {personsService} from './persons.service';
import { IPerson } from '../models/IPerson';

import {mockUpdatePersons} from '../services/__mocks__/persons.service';
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
    return new Promise((res) => {
      res(fetchedUsers);
    })
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

const mockedUpdPersons = [
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
];

const exampleObj = {
    id: '123213',
    name: 'example name',
    location: {lat: 0, lng: 0},
    direction: 0
};


instance.persons = examplePersons;



describe('PersonsService', () => {
  jest.spyOn(instance, 'getPersons');
  jest.spyOn(instance, 'updatePersons');
  jest.spyOn(httpService, 'activateWalking');
  jest.spyOn(httpService, 'disactivateWalking');
  jest.spyOn(httpService, 'addPerson');
  jest.spyOn(httpService, 'deletePerson');

  /*
  beforeEach(() => {
    initializeCityDatabase();
  });
  */


  //  addPerson
  it('Expect to add person.', () => {
    instance.addPerson(
      {
        id: '231321',
        name: 'test name',
        location: {lat: 1, lng: 1},
        direction: 1
      }
    );
    expect(httpService.addPerson).toHaveBeenCalledWith({
      id: '231321',
      name: 'test name',
      location: {lat: 1, lng: 1},
      direction: 1
    });
    expect(instance.persons).toEqual(mockedUpdPersons)
    expect(httpService.addPerson).toHaveBeenCalled();
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
    ]);
    expect(httpService.deletePerson).toHaveBeenCalled();
    expect(httpService.deletePerson).toHaveBeenCalledWith('231321');
  });


  //  updatePersons
  it('Expect to update persons', (done) => {
    // expect.assertions(3);
    instance.updatePersons();
    expect(instance.updatePersons).toReturn();
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@1");
    mockUpdatePersons().then(personsArray =>  {
      expect(instance.persons).toEqual(mockedUpdPersons);
      expect(personsArray).toEqual(mockedUpdPersons);
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2");
      done();
    });
  });

  //  getPersons
  it('Expect to return persons', () => {
    const returnedValue = instance.getPersons();
    expect(instance.getPersons).toReturn();
    expect(returnedValue).toEqual(instance.persons);
  });

  //  getPerson
  it('Expect to return person', () => {
    const returnedValue = instance.getPerson('123213');
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
  });

  //  unsetWalking
  it('Expect httpService.disactivateWalking to be called on personsService.unsetWalking invocation.', () => {
   instance.unsetWalking()
   expect(httpService.disactivateWalking).toHaveBeenCalled();
  })

  // TEST THAT DOESNT PASS FOR SURE
  //  getPerson with empty string
  it('Expect to return some message', () => {
    const returnedValue = instance.getPerson('');
    expect(typeof (returnedValue) !== 'undefined').toBe(true);
  });

  // try to delete person without passing a person
  it('Expect to throw an error and not to call httpService', () => {
    instance.deletePerson(undefined);
    expect(instance.deletePerson).toThrow();
    expect(httpService.deletePerson).not.toHaveBeenCalled();
  });

});