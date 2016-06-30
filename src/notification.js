import React from 'react';

export default function notification(Component) {
  return class Yell extends React.Component {
    static contextTypes = {
      notify: React.PropTypes.func,
      closeNotification: React.PropTypes.func
    }

    render() {
      return (
        <Component {...this.props} {...this.context} />
      );
    }
  }
}
