import * as React from 'react';

import { IPerson } from '../models/IPerson';

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

  // person = {
  //   id: '131222210',
  //   name: 'Marysia nowak',
  //   location: {
  //     lat: 200,
  //     lng: 200
  //   },
  //   direction: 165
  // }

  componentDidMount() {
    // this.props.pServ.addPerson(this.person);
    // this.pServ.getPerson(1010101110101010);
    // this.props.pServ.deletePerson(13232110);
  }

  render() {
    const persons = [...this.state.persons];
    const person = {...this.state.person};
    console.log("PERSON", person)

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
        PERSONS
        <div>
          {newPersons}
        </div>
        PERSON
        <div>
          {person.name}
        </div>
      </h1>
    );
  }
}

