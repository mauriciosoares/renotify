import React from 'react';
import Notification from './item';

class Items extends React.Component {
  render() {
    const {notifications} = this.props;

    return (
      <div>
        {notifications.map(notification => {
          return (
            <Notification key={notification.id} {...notification} />
          );
        })}
      </div>
    )
  }
}

export default Items;
