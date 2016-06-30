import React from 'react';
import Notification from './notification';

class Notifications extends React.Component {
  render() {
    const {notifications} = this.props;

    return (
      <div className="react-notification__items">
        {notifications.map(notification => {
          return (
            <Notification key={notification.id} {...notification} />
          );
        })}
      </div>
    )
  }
}

export default Notifications;
