import React from 'react';

export default function notifiable(shape = {}) {
  return (Component) => class Notifiable extends React.Component {
    static displayName = 'Notifiable';

    static contextTypes = {
      __notify: React.PropTypes.func,
      __closeNotification: React.PropTypes.func
    };

    render() {
      const {__notify, __closeNotification} = this.context;
      const customProps = {
        notify: (notification) => __notify({
          ...shape,
          ...notification
        }),
        closeNotification: __closeNotification
      };

      return (
        <Component {...this.props} {...customProps} />
      );
    }
  };
}
