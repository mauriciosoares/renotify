import React from 'react';
import Notification from './components/notification';
import uuid from 'node-uuid';
import './yell.css';

const defaultTheme = {
  container: 'react-yell__container',
  notification: 'react-yell__notification'
}

class YellContainer extends React.Component {
  static childContextTypes = {
    yell: React.PropTypes.func,
    closeYell: React.PropTypes.func
  }

  state = {
    notifications: []
  }

  constructor(props) {
    super(props);

    this._yell = this._yell.bind(this);
    this._closeYell = this._closeYell.bind(this);
  }

  getChildContext() {
    return {
      yell: this._yell,
      closeYell: this._closeYell
    }
  }

  render() {
    const {notifications} = this.state;

    return (
      <div>
        {notifications.map(notification => {
          return (
            <Notification key={notification.id} {...notification} />
          );
        })}

        {this.props.children}
      </div>
    );
  }

  _yell({title = null}) {
    const {notifications} = this.state;
    this._setNotification([...notifications, {
      id: uuid.v1(),
      title
    }]);
  }

  _closeYell(id) {
    const {notifications} = this.state;

    this._setNotification(notifications.filter(n => n.id !== id));
  }

  _setNotification(notifications) {
    this.setState({notifications});
  }
}

export default YellContainer;
