import React from 'react';
import Notification from './components/notification';
import uuid from 'node-uuid';
import Notifications from './components/notifications';
import {container, items} from './notification.css';

const defaultTheme = {
  container,
  items
}

class NotificationContainer extends React.Component {
  static childContextTypes = {
    __notify: React.PropTypes.func,
    __closeNotification: React.PropTypes.func,
    __theme: React.PropTypes.object
  }

  static defaultProps = {
    theme: {}
  }

  static propTypes = {
    theme: React.PropTypes.object
  }

  state = {
    notifications: []
  }

  constructor(props) {
    super();

    this._notify = this._notify.bind(this);
    this._closeNotification = this._closeNotification.bind(this);

    this._theme = {...defaultTheme, ...props.theme}
  }

  getChildContext() {
    return {
      __notify: this._notify,
      __closeNotification: this._closeNotification,
      __theme: this._theme

    }
  }

  render() {
    const {notifications} = this.state;

    return (
      <div>
        <Notifications notifications={notifications} />

        {this.props.children}
      </div>
    );
  }

  _notify({title = null}) {
    const {notifications} = this.state;
    this._setNotification([...notifications, {
      id: uuid.v1(),
      title
    }]);
  }

  _closeNotification(id) {
    const {notifications} = this.state;

    this._setNotification(notifications.filter(n => n.id !== id));
  }

  _setNotification(notifications) {
    this.setState({notifications});
  }
}

export default NotificationContainer;
