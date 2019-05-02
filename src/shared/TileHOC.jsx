import React, { Component } from 'react';

export default ChildComponent => class extends Component {
  shouldComponentUpdate(nextProps) {
    const { classes } = this.props;
    return JSON.stringify(classes) !== JSON.stringify(nextProps.classes);
  }

  render() {
    return <ChildComponent {...this.props} />;
  }
};
