import React from 'react';
import Item from './item';

class Items extends React.Component {
  static displayName = 'Items';

  render() {
    const {notifications} = this.props;

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
