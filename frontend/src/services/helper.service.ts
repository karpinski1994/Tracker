import { Inject } from '../di/DIContainer';

@Inject('utilsService')
export class helperService {
  constructor() {
    console.log('tworze helperService');
  }
}
