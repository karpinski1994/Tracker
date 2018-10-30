import { Inject } from '../di/DIContainer';

@Inject('circularAService')
export class circularCService {
  constructor(private testtestServ: circularAService) {
    console.log('tworze circularCService');
  }
}
