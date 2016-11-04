import React, {PropTypes} from 'react';
import uuid from 'node-uuid';
import {connect} from 'react-redux';
import Items from './components/items';
import {actionCreators} from './reducerAndActions';

class Notification extends React.Component {
  static displayName = 'Notification';

  static propTypes = {
    $$notifiable: PropTypes.object,
    children: PropTypes.element,
    notify: PropTypes.func,
    closeNotification: PropTypes.func,
    theme: PropTypes.func.isRequired
  };

  constructor() {
    super();

    this.notify = this.notify.bind(this);
    this.closeNotification = this.closeNotification.bind(this);
  }

  render() {
    const {theme, $$notifiable: {notifications}} = this.props;

    return (
      <div {...theme(1, 'container')}>
        <Items notifications={notifications} theme={theme} />
        {this.props.children}
      </div>
    );
  }

  notify(notification) {
    const {notify} = this.props;
    const id = uuid.v4();

    notify({...notification, id});

    return id;
  }

  closeNotification(id) {
    const {closeNotification} = this.props;

    closeNotification(id);
  }
}

const mapStateToProps = (state) => ({
  $$notifiable: state.$$notifiable || state
});

export default connect(mapStateToProps, actionCreators)(Notification);
