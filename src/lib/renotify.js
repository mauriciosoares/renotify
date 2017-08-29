import React from 'react';
import PropTypes from 'prop-types';

export default function renotify(shape = {}) {
  return (Component) => class Renotify extends React.Component {
    static displayName = 'Renotify';

    static contextTypes = {
      __notify: PropTypes.func,
      __closeNotification: PropTypes.func
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
