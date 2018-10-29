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

export class DIComponent extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {}
  }

  render() {
    const { children } = this.props;
    const childrenWithProps = React.Children.map(children, child => {
      let instances: any = [];
      if(child) child.type.deps.forEach((depName: string) => {
        const instance = diContainer.getInstance(depName);
        instances.push(instance);
      })
      const curInstances = [...instances];
        const obj = {};
        curInstances.forEach(i => obj[`${i.name}`] = i.instance);
      return (React.cloneElement(child, { services: obj}));
    });
    return(
      <div>
        {childrenWithProps}
      </div>
    );
  }
}