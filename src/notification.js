import React, {PropTypes} from 'react';
import uuid from 'uuid';
import {connect} from 'react-redux';
import Items from './components/items';
import {actionCreators} from './reducerAndActions';

class Notification extends React.Component {
  static displayName = 'Notification';

  static propTypes = {
    $$notifiable: PropTypes.array,
    children: PropTypes.element,
    notify: PropTypes.func,
    closeNotification: PropTypes.func
  }

  static childContextTypes = {
    __notify: React.PropTypes.func,
    __closeNotification: React.PropTypes.func
  };

  getChildContext() {
    return {
      __notify: this.notify,
      __closeNotification: this.closeNotification
    };
  }

  constructor() {
    super();

    this.notify = this.notify.bind(this);
    this.closeNotification = this.closeNotification.bind(this);
  }

  render() {
    const {notifications} = this.props.$$notifiable;

    return (
      <div>
        <Items notifications={notifications} />
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
