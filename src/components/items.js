import React, {PropTypes} from 'react';
import Item from './item';

class Items extends React.Component {
  static displayName = 'Items';

  static propTypes = {
    notifications: PropTypes.array.isRequired,
    theme: PropTypes.func.isRequired
  };

  render() {
    const {notifications, theme} = this.props;

    return (
      <div {...theme(1, 'items')}>
        {notifications.map(notification => {
          return (
            <Item theme={theme} key={notification.id} {...notification} />
          );
        })}
      </div>
    );
  }
}

export default Items;
