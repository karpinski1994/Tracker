import * as React from 'react';

import { IPerson } from '../models/IPerson';

import { PersonsList } from './persons/PersonsList';
import { AddPerson } from './persons/AddPerson';
import { MyMapComponent } from './map/Map';

import * as socketIOClient from 'socket.io-client';

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
    const socket = socketIOClient('http://localhost:3000');
    socket.on("persons", (persons: IPerson[]) => {
      this.setState({ persons: persons })
    });
  }

  person = {
    id: '131222211233120',
    name: 'Marysia now123123312ak',
    location: {
      lat: 200,
      lng: 200
    },
    direction: 0
  }

  setWalkingHandler = () => {
    fetch('http://localhost:3000/api/person/mode/walking');
  };

  setStationaryHandler = () => {
    fetch('http://localhost:3000/api/person/mode/stationary');
  }

  render() {
    return (
      <div className="app-container">
        <aside className="cockpit-container">
          <PersonsList persons={this.state.persons} pServ={this.props.pServ}/>
          <AddPerson pServ={this.props.pServ}/>
        </aside>
        <main className="map-container">
          <button onClick={() => this.setWalkingHandler()}>Walking</button>
          <button onClick={() => this.setStationaryHandler()}>Stationary</button>
          <MyMapComponent
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `90%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            persons={this.state.persons}
          />
        </main>
      </div>
    );
  }
}