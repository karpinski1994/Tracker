import * as React from 'react';

interface IState {
}
interface IProps {

}

export class DIComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {}
  }

  render() {

    return(
      <div>
        <h2>DIComponent</h2>
      </div>
    );
  }
}