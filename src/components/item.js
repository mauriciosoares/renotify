import React from 'react';
import {connect} from 'react-redux';
import notifiable from '../notifiable';

class Notification extends React.Component {
  render() {
    const {title, id, closeNotification} = this.props;

    return (
      <div onClick={() => closeNotification(id)}>
        {title}
      </div>
    );
  }
}

export default notifiable(Notification);
