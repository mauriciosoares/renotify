import React from 'react';

export default function renotify(shape = {}) {
  return (Component) => class Renotify extends React.Component {
    static displayName = 'Renotify';

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
