import * as React from 'react';

import { IPerson } from '../../models/IPerson';

interface IProps {
  persons: IPerson[];
}

export class PersonsList extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const persons = [...this.props.persons];
    const personsMarkup = persons.map((p, index) => {
      return (
        <div key={Math.random().toString(36).substr(2, 9)}>
          {p.name}
          <button onClick={() => console.log(index)}>X</button>
        </div>
      )
    });

    return (
      <div className="persons-list-container">
        <h2>Tracked workers:</h2>
        { personsMarkup }
      </div>
    );
  }
}