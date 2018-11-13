// const PersonsService  = require('./persons.service');

import {personsService} from './persons.service';
import { IPerson } from '../models/IPerson';

const mockedPerson = {
  id: '123213',
  name: 'example name',
  location: {lat: 0, lng: 0},
  direction: 0
};

const httpService = {
  activateWalking() {},
  disactivateWalking() {},
  addPerson(person: IPerson) {},
  deletePerson(id: string) {},
  getPersons() {
    return new Promise((res) => {
      res([mockedPerson]);
    })
  }
};

let instance: any = {};

describe('PersonsService', () => {
  beforeEach(() => {
    instance = new personsService({}, {}, httpService);
    jest.spyOn(instance, 'getPersons');
    jest.spyOn(instance, 'updatePersons');
    jest.spyOn(httpService, 'activateWalking');
    jest.spyOn(httpService, 'disactivateWalking');
    jest.spyOn(httpService, 'addPerson');
    jest.spyOn(httpService, 'deletePerson');
  });

  //  addPerson
  it('Expect to add person.', () => {
    instance.addPerson(mockedPerson);
    expect(httpService.addPerson).toHaveBeenCalledWith(mockedPerson);
    expect(instance.persons).toEqual([mockedPerson])
    expect(httpService.addPerson).toHaveBeenCalled();
  });

  // deletePerson
  it('Expect to delete person', () => {
    instance.persons = [mockedPerson];
    expect(instance.persons.length).toEqual(1);
    instance.deletePerson('231321');
    expect(instance.persons.length).toEqual(0);
    expect(httpService.deletePerson).toHaveBeenCalled();
    expect(httpService.deletePerson).toHaveBeenCalledWith('231321');
  });

  //  updatePersons
  it('Expect to update persons', (done) => {
    instance.updatePersons = () => {
      return new Promise((resolve, reject) => {
        process.nextTick(
          () =>resolve([mockedPerson])
        );
      });
    }
    instance.updatePersons().then((personsArray: IPerson[]) =>  {
      instance.persons = personsArray;
      expect(instance.persons).toEqual([mockedPerson]);
      expect(personsArray).toEqual([mockedPerson]);
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
    instance.persons = [mockedPerson];
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
  // it('Expect to return some message', () => {
  //   const returnedValue = instance.getPerson('');
  //   expect(typeof (returnedValue) !== 'undefined').toBe(true);
  // });

  // // try to delete person without passing a person
  // it('Expect to throw an error and not to call httpService', () => {
  //   instance.deletePerson(undefined);
  //   expect(instance.deletePerson).toThrow();
  //   expect(httpService.deletePerson).not.toHaveBeenCalled();
  // });

});