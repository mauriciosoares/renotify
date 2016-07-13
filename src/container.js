import React, {PropTypes} from 'react';
import Notification from './notification';
import uuid from 'node-uuid';
import Notifications from './components/notifications';
import {container, items} from './notification.css';

const defaultTheme = {
  container,
  items
}

class Container extends React.Component {
  static childContextTypes = {
    __notify: PropTypes.func,
    __closeNotification: PropTypes.func,
    __theme: PropTypes.object
  }

  static contextTypes = {
    store: PropTypes.shape({
      subscribe: PropTypes.func.isRequired,
      dispatch: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired
    })
  }

  static defaultProps = {
    theme: {}
  }

  static propTypes = {
    theme: PropTypes.object
  }

  constructor(props, context) {
    super();

    this._theme = {...defaultTheme, ...props.theme}

    this.store = context.store;

    console.log(this.store.getState());

    this.store.injectReducer(() => {return {}})

    console.log(this.store.getState());
  }

  getChildContext() {
    return {
      __notify: this._notify,
      __closeNotification: this._closeNotification,
      __theme: this._theme

    }
  }

  render() {
    const notifications = [];

    return (
      <div>
        <Notification>
          {this.props.children}
        </Notification>
      </div>
    );
  }

  // _notify({title = null}) {
  //   const {notifications} = this.state;
  //   this._setNotification([...notifications, {
  //     id: uuid.v1(),
  //     title
  //   }]);
  // }

  // _closeNotification(id) {
  //   const {notifications} = this.state;

  //   this._setNotification(notifications.filter(n => n.id !== id));
  // }

  // _setNotification(notifications) {
  //   this.setState({notifications});
  // }
}

export default Container;
