import React, {PropTypes} from 'react';
import {createStore} from 'redux';
import Notification from './notification';
import reducer, {updateNotificationTemplate} from './reducerAndActions';
import themeable from 'react-themeable';
import './style.css';

const DEFAULT_THEME = {
  container: 'react-notifiable__container',
  items: 'react-notifiable__items',
  item: 'react-notifiable__item'
};

class Container extends React.Component {
  static displayName = 'Container';

  static propTypes = {
    children: PropTypes.element,
    notificationTemplate: PropTypes.object,
    theme: PropTypes.object
  };

  static defaultProps = {
    theme: {}
  }

  static contextTypes = {
    store: PropTypes.shape({
      subscribe: PropTypes.func.isRequired,
      dispatch: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired
    })
  };

  constructor(props, context) {
    super(props);

    this.theme = themeable({
      ...DEFAULT_THEME,
      ...props.theme
    });

    if(props.notificationTemplate) {
      updateNotificationTemplate(props.notificationTemplate);
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
