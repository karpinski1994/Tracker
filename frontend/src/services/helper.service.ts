import { Inject } from '../di/DIContainer';

@Inject('utilsService')
export class helperService {
  constructor(private utS) {
    console.log('tworze helperService');
  }
}
