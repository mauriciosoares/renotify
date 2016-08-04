import React, {PropTypes} from 'react';
import {createStore} from 'redux';
import Notification from './notification';
import reducer, {updateNotificationShape} from './reducerAndActions';
import themeable from 'react-themeable';
import './style.scss';

const DEFAULT_THEME = {
  container: 'react-notifiable__container',
  items: 'react-notifiable__items',
  item: 'react-notifiable__item',
  itemTexts: 'react-notifiable__item-texts',
  itemTitle: 'react-notifiable__item-title',
  itemMessage: 'react-notifiable__item-message',
  itemActions: 'react-notifiable__item-actions'
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

    if(context.store && context.store.getState().$$notifiable) {
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
