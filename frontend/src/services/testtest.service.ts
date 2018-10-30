import { Injectable} from '../di/DIContainer';

@Injectable
export class testtestService {
  constructor() {
    console.log('tworze testtestService');
  }
  test() {
    console.log('EVTH WORKS!')
  }
}