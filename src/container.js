import React, {PropTypes} from 'react';
import {createStore} from 'redux';
import Notification from './notification';
import reducer, {updateNotificationShape} from './reducerAndActions';
import themeable from 'react-themeable';

console.log('test');

const DEFAULT_THEME = {
  container: 'renotify__container',
  items: 'renotify__items',
  item: 'renotify__item',
  itemTexts: 'renotify__item-texts',
  itemTitle: 'renotify__item-title',
  itemMessage: 'renotify__item-message',
  itemActions: 'renotify__item-actions'
};

class Container extends React.Component {
  static displayName = 'Container';

  static propTypes = {
    children: PropTypes.element,
    notificationShape: PropTypes.object,
    theme: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.shape({
      subscribe: PropTypes.func.isRequired,
      dispatch: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired
    })
  };

  constructor(props, context) {
    super(props);

    this.theme = themeable(props.theme || DEFAULT_THEME);

    if(props.notificationShape) {
      updateNotificationShape(props.notificationShape);
    }

    if(context.store && context.store.getState().$$renotify) {
      this.store = context.store;
    } else {
      this.store = createStore(reducer);
    }
  }

  render() {
    return (
      <Notification store={this.store} theme={this.theme}>
        {this.props.children}
      </Notification>
    );
  }
}

export default Container;
