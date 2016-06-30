import React from 'react';
import Notification from './components/notification';
import uuid from 'node-uuid';
import './notification.css';
import Notifications from './components/notifications';

const defaultTheme = {
  container: 'react-notification__container',
  notification: 'react-notification__item'
}

class NotificationContainer extends React.Component {
  static childContextTypes = {
    notify: React.PropTypes.func,
    closeNotification: React.PropTypes.func
  }

  state = {
    notifications: []
  }

  constructor(props) {
    super(props);

    this._notify = this._notify.bind(this);
    this._closeNotification = this._closeNotification.bind(this);
  }

  getChildContext() {
    return {
      notify: this._notify,
      closeNotification: this._closeNotification
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
