import React, { Component } from 'react';

export default ChildComponent => class extends Component {
  shouldComponentUpdate(nextProps) {
    const { classes } = this.props;
    if (JSON.stringify(classes) !== JSON.stringify(nextProps.classes)) {
      return true;
    }
    return false;
  }

  render() {
    return <ChildComponent {...this.props} />;
  }
};
