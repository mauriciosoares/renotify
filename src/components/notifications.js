import React from 'react';
import Notification from './notification';

class Notifications extends React.Component {
  static contextTypes = {
    __theme: React.PropTypes.object
  }

  render() {
    const {notifications} = this.props;
    const {__theme} = this.context;

    return (
      <div className={__theme.items}>
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
