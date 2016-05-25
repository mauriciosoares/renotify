import React from 'react';

export default function(Component) {
  return class Yell extends React.Component {
    static contextTypes = {
      yell: React.PropTypes.func,
      closeYell: React.PropTypes.func
    }

    render() {
      return (
        <Component {...this.props} {...this.context} />
      );
    }
  }
}
