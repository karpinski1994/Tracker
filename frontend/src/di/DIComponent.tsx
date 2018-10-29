import * as React from 'react';
import '../services/persons.service';
import '../services/http.service';
import '../services/helper.service';
import '../services/utils.service';
import '../services/test.service';
import '../services/testtest.service';
// import '../services/circularA.service';
// import '../services/circularB.service';
// import '../services/circularC.service';

import { diContainer } from './DIContainer';
diContainer.initiate();
const instancesArr = diContainer.getInstances();
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
    const { children } = this.props;
    console.log(children)
    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { pServ: instancesArr[5]})
    );
    return(
      <div>
        {childrenWithProps}
      </div>
    );
  }
}