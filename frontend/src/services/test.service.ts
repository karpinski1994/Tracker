import { Inject } from '../di/DIContainer';

@Inject('testtestService')
export class testService {
  constructor(private testtestServ: testtestService) {
    console.log('tworze testService');
  }
  test() {
    this.testtestServ.test();
  }
}
