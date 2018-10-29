import { Inject } from '../di/DIContainer';

@Inject('circularCService')
export class circularBService {
  constructor(private testtestServ: circularCService) {
    console.log('tworze circularBService');
  }
}
