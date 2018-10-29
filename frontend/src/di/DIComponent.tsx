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

export class DIComponent extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {}
  }

  render() {
    const { children } = this.props;
    const { instance } = diContainer.getInstance(children.type.dep);
    const childrenWithProps = React.Children.map(children, child => {
      return (React.cloneElement(child, { service: instance}));
    });
    return(
      <div>
        {childrenWithProps}
      </div>
    );
  }
}