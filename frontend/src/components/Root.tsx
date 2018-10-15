import * as React from 'react';
import { App } from './App';


import { personsService } from '../services/persons.service';
interface IState {
  loaded: boolean;
}

interface IProps {
  pServ: object;
}

export class Root extends React.Component<IProps, IState> {
  pServ: personsService;
  state: IState;
  constructor(props: Readonly<IProps>) {
    super(props);
    this.state = {
      loaded: false,
    };
    this.pServ = new personsService();
  }

  componentDidMount() {
    console.log('did mount Root.tsx')
    this.load();
  }

  load = () => {
    this.pServ.updatePersons()
      .then(() => {
        this.setState({
        loaded: true,
      })
    });
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading...</div>;
    } else {
      this.pServ.getPersons();
    }
    return (
      <App pServ={this.pServ}/>
    );
  }
}

