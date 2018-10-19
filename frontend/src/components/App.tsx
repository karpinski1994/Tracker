import * as React from 'react';

import { IPerson } from '../models/IPerson';

import { PersonsList } from './persons/PersonsList';
import { AddPerson } from './persons/AddPerson';
import { MyMapComponent } from './map/Map';

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
  walkingInterval: any = null;
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
    direction: 0
  }

  update = (updPersons: IPerson[]) => {
    this.setState({ persons: updPersons});
  }

  setWalkingHandler = () => {
    this.walkingInterval = setInterval(() => {
      fetch('http://localhost:3000/api/person/mode/walking')
      .then((response) => response.json())
      .then(data =>  {
          this.setState({ persons: data.persons });
        }
      );
    }, 2000);
  }

  setStationaryHandler = () => {

    fetch('http://localhost:3000/api/person/mode/stationary')
    .then(data => data.json())
    .then(message => console.log(message));
    clearInterval(this.walkingInterval);
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