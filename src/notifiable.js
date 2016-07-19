import React from 'react';

export default function notifiable(notificationPreset = {}) {
  return (Component) => class Notifiable extends React.Component {
    static displayName = 'Notifiable';

    static contextTypes = {
      __notify: React.PropTypes.func,
      __closeNotification: React.PropTypes.func
    };

    render() {
      const {__notify, __closeNotification} = this.context;
      const customProps = {
        notify: __notify,
        closeNotification: __closeNotification
      }
      return (
        <Component {...this.props} {...customProps} />
      );
    }
  }
}
