import * as React from 'react';

import { IPerson } from '../../models/IPerson';

interface IState {
  name: string;
  long: string;
  lat: string;
}
interface IProps {
  pServ: any,
}


export class AddPerson extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      name: 'Krystyna Skarbek',
      lat: '-34.644',
      long: '150.600'
    }
  }

  onNameChangeHandler = (e: any) => {
    this.setState({
      name: e.target.value
    });
  }

  onLongChangeHandler = (e: any) => {
    this.setState({
      long: e.target.value
    });
  }

  onLatChangeHandler = (e: any) => {
    this.setState({
      lat: e.target.value
    });
  }

  getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  onAddWorkerHandler = () => {
    this.props.pServ.addPerson({
      id: Math.random().toString(36).substr(2, 9),
      name: this.state.name,
      location: {
        lat: parseFloat(this.state.lat),
        lng: parseFloat(this.state.long)
      },
      direction: this.getRandomInt(0, 360)
    });
    // this.setState({
    //   name: '',
    //   lat: '',
    //   long: ''
    // })
  }

  render() {

    return(
      <div className="add-person-container">
        <h2>Add worker: </h2>
        <input onChange={(e) => this.onNameChangeHandler(e)} type="text" placeholder="Person's full name" value={this.state.name}/>
        <input onChange={(e) => this.onLatChangeHandler(e)} type="number" placeholder="Person's latitude" value={this.state.lat} />
        <input onChange={(e) => this.onLongChangeHandler(e)} type="number" placeholder="Person's longitude" value={this.state.long} />
        <button onClick={() => this.onAddWorkerHandler()}>Add worker</button>
      </div>
    );
  }
}