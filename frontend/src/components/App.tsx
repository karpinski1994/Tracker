import * as React from 'react';

import { IPerson } from '../models/IPerson';

import { PersonsList } from './persons/PersonsList';
import { AddPerson } from './persons/AddPerson';

interface IState {
  persons: Array<IPerson>,
}

interface IProps {
  pServ: any,
}

export class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      persons: this.props.pServ.getPersons(),
    }
  }
  componentDidMount() {
    this.props.pServ.subscribe(this.update);
  }

  person = {
    id: '131222211233120',
    name: 'Marysia now123123312ak',
    location: {
      lat: 200,
      lng: 200
    },
    direction: 165
  }

  update = (updPersons: IPerson[]) => {
    this.setState({ persons: updPersons});
  }


  render() {

    return (
      <div className="app-container">
        <aside className="cockpit-container">
          <PersonsList persons={this.state.persons} pServ={this.props.pServ}/>
          <AddPerson pServ={this.props.pServ}/>
        </aside>
        <main className="map-container">

        </main>
      </div>
    );
  }
}