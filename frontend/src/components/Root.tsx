import * as React from 'react';
import { App } from './App';

import { personsService } from '../services/persons.service';
import '../services/http.service';

import { diContainer } from '../di/DIContainer';

interface IState {
  loaded: boolean;
}

const instances = diContainer.initiate();

console.log(instances.get('httpService'))

export class Root extends React.Component<{}, IState> {
  pServ: personsService;
  state: IState;
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      loaded: false,
    };
    this.pServ = new personsService(instances.get('httpService'));
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

