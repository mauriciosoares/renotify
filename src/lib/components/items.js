import React from 'react';
import PropTypes from 'prop-types';
import Item from './item';
import Transition from 'react-addons-css-transition-group';

const TRANSITION_TIMEOUT = 300;

class Items extends React.Component {
  static displayName = 'Items';

  static propTypes = {
    notifications: PropTypes.array.isRequired
  };

  render() {
    const {notifications} = this.props;

    return (
      <div className="renotify__items">
        <Transition
          transitionName="renotify__items"
          transitionEnterTimeout={TRANSITION_TIMEOUT}
          transitionLeaveTimeout={TRANSITION_TIMEOUT}>
          {notifications.map(notification => {
            return (
              <Item key={notification.id} {...notification} />
            );
          })}
        </Transition>
      </div>
    );
  }
}

export default Items;
