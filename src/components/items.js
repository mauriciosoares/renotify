import React, {PropTypes} from 'react';
import Item from './item';
import Transition from 'react-addons-css-transition-group';

const TRANSITION_TIMEOUT = 300;

class Items extends React.Component {
  static displayName = 'Items';

  static propTypes = {
    notifications: PropTypes.array.isRequired,
    theme: PropTypes.func.isRequired
  };

  render() {
    const {notifications, theme} = this.props;
    const itemsTheme = theme(1, 'items');

    return (
      <div {...itemsTheme}>
        <Transition
          transitionName={itemsTheme.className}
          transitionEnterTimeout={TRANSITION_TIMEOUT}
          transitionLeaveTimeout={TRANSITION_TIMEOUT}>
          {notifications.map(notification => {
            return (
              <Item theme={theme} key={notification.id} {...notification} />
            );
          })}
        </Transition>
      </div>
    );
  }
}

export default Items;
