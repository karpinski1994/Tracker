import * as React from 'react';

import { personsService } from '../services/persons.service';
import { IPerson } from '../models/IPerson';

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
      persons: this.props.pServ.getPersons();
    }
  }

  // person = {
  //   id: '1010101110101010',
  //   name: 'Mariusz Kowalski',
  //   location: {
  //     lat: 200,
  //     lng: 200
  //   },
  //   direction: 165
  // }

  componentDidMount() {
    // this.pServ.addPerson(this.person);
    // this.pServ.getPerson(1010101110101010);

  }

  render() {
    const persons = [...this.state.persons];

    const newPersons = persons.map(p => {
      return (
        <div key={Math.random().toString(36).substr(2, 9)}>
          {p.name}
          <button>X</button>
        </div>
      )
    });

    return (
      <h1>
        Hello world.
        <div>
          {newPersons}
        </div>
      </h1>
    );
  }
}

