import React from 'react';
import notification from '../notification.js';

class Notification extends React.Component {
  static contextTypes = {
    __closeNotification: React.PropTypes.func,
    __theme: React.PropTypes.object
  }

  render() {
    const {title, id} = this.props;
    const {__closeNotification, __theme} = this.context
    return (
      <div className={__theme.item} onClick={() => {__closeNotification(id)}}>
        {title}
      </div>
    );
  }
}

export default Notification;
