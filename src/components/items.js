import React, {PropTypes} from 'react';
import Item from './item';

class Items extends React.Component {
  static displayName = 'Items';

  static propTypes = {
    notifications: PropTypes.array.isRequired
  };

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
    );
  }
}

export default Items;
