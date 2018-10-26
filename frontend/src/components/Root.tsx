import * as React from 'react';
import { App } from './App';

import { Inject } from '../di/DIContainer';


interface IState {
  loaded: boolean;
}

interface IProps {
}

@Inject('personsService')
export class Root extends React.Component<IProps, IState> {
  state: IState;

  constructor(props: IProps, private pServ: any){
    super(props);
    this.state = {
      loaded: false,
    };
    console.log('ROOT PROPS', props)
  }

  componentDidMount() {
    this.load();
  }

  load = () => {
    this.pServ.updatePersons()
      .then((data) => {
        this.setState({
        loaded: true,
      });
    });
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading...</div>;
    }
    return (
      // pServ = {dIContainer.getDependencies()}
      <App pServ={this.pServ}/>
    );
  }
}

