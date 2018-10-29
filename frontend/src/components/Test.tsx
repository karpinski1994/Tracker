import * as React from 'react';
import { App } from './App';

import { Inject } from '../di/DIContainer';


interface IState {
  loaded: boolean;
}

interface IProps {
}

@Inject('testService')
export class Test extends React.Component<IProps, IState> {
  state: IState;

  constructor(props: IProps){
    super(props);
    this.state = {};
    // this.pServ = props.services.testService;
    // console.log('TEST PROPS', props)
    console.log('TEST SERVICES', props.services);
  }

  componentDidMount() {
    this.props.services.testService.test();
  }
  render() {

    return (
      // pServ = {dIContainer.getDependencies()}
      <div>test test test test test test test test test test</div>
    );
  }
}

