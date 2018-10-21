import * as React from 'react';
import { App } from './App';

import { personsService } from '../services/persons.service';
interface IState {
  loaded: boolean;
}

export class Root extends React.Component<{}, IState> {
  pServ: personsService;
  state: IState;
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      loaded: false,
    };
    this.pServ = new personsService();
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
      <App pServ={this.pServ}/>
    );
  }
}

