import { Inject } from '../di/DIContainer';

@Inject('circularBService')
export class circularAService {
  constructor(private testtestServ: circularBService) {
    console.log('tworze circularAService');
  }
}
