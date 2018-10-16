import * as React from 'react';

import { IPerson } from '../models/IPerson';

import { PersonsList } from './persons/PersonsList';
import { AddPerson } from './persons/AddPerson';

interface IState {
  persons: Array<IPerson>,
  person: IPerson
}

interface IProps {
  pServ: any,
}

export class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      persons: this.props.pServ.getPersons(),
      person: this.props.pServ.getPerson(1010101110101010)
    }
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

  componentDidMount() {
    // this.props.pServ.addPerson(this.person);
    // this.pServ.getPerson(1010101110101010);
    // this.props.pServ.deletePerson(13232110);
  }

  render() {
    const persons = [...this.state.persons];
    const person = {...this.state.person};
    console.log("PERSON", person)

    return (
      <div className="app-container">
        <aside className="cockpit-container">
          <PersonsList persons={this.state.persons} />
          <AddPerson pServ={this.props.pServ}/>
        </aside>
        <main className="map-container">

        </main>
      </div>
    );
  }
}

