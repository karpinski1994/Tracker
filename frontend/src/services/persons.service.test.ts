// const PersonsService  = require('./persons.service');

import {personsService} from './persons.service';

const httpService = {
  activateWalking() { return true; }
};

// const instance = new personsService({}, {}, httpService);


describe('PersonsService', () => {
  it('Expect httpService.activateWalking to be called on personsService.setWalking invocation.', () => {
    const spy = jest.spyOn(httpService, 'activateWalking');
    expect(spy).toHaveBeenCalled();
  })
});