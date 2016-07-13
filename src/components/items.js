import React from 'react';
import Item from './item';

class Items extends React.Component {
  render() {
    const {notifications} = this.props;
    console.log(notifications);

    return (
      <div>
        {notifications.map(notification => {
          return (
            <Item key={notification.id} {...notification} />
          );
        })}
      </div>
    )
  }
}

export default Items;
