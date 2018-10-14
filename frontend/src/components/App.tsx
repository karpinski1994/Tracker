import * as React from 'react';

interface IProps {
  name: string;
}

class App extends React.Component<IProps, {}> {
  render() {
    return (
      <h1>
        Hello world.
        {this.props.name}
      </h1>
    );
  }
}
export default App;
