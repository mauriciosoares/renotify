import React from 'react';
import Notification from './components/notification';
import uuid from 'node-uuid';

const defaultTheme = {
  container: 'react-yell__container',
  notification: 'react-yell__notification'
}

class YellContainer extends React.Component {
  static childContextTypes = {
    yell: React.PropTypes.func
  }

  constructor(props) {
    super(props);

    this._yell = this._yell.bind(this);

    this.state = {
      notifications: []
    };
  }

  getChildContext() {
    return {
      yell: this._yell
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
    this._setNotification({
      id: uuid.v1(),
      title
    });
  }

  _setNotification(notification) {
    const {notifications} = this.state;

    this.setState({
      notifications: [...notifications, notification]
    });
  }
}

export default YellContainer;
