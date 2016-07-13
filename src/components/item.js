import React from 'react';
import {connect} from 'react-redux';

class Notification extends React.Component {
  static contextTypes = {
    __closeNotification: React.PropTypes.func
  }

  render() {
    const {title, id} = this.props;
    const {__closeNotification} = this.context;

    return (
      <div onClick={() => __closeNotification(id)}>
        {title}
      </div>
    );
  }
}

export default Notification;
