import * as React from 'react';

import { personService } from '../services/person.service';

interface IProps {
  name: string;
}

export class App extends React.Component<IProps, {}> {
  pServ = new personService();
  person = {
    id: '1010101110101010',
    name: 'Mariusz Kowalski',
    location: {
      lat: 200,
      lng: 200
    },
    direction: 165
  }
  constructor(props: IProps,) {
    super(props);
  }

  componentDidMount() {
    //this.pServ.addPerson(this.person);
    //this.pServ.getPersons();
    this.pServ.getPerson(1010101110101010);
  }

  render() {
    return (
      <h1>
        Hello world.
        {this.props.name}
      </h1>
    );
  }
}

