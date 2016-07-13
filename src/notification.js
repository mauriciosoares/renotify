import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Items from './components/items';
import {actionCreators} from './reducerAndActions';

class Notification extends React.Component {
  static childContextTypes = {
    __notify: React.PropTypes.func,
    __closeNotification: React.PropTypes.func
  }

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
    const {notifications} = this.props.$$notifiable

    return (
      <div>
        <Items notifications={notifications} />
        {this.props.children}
      </div>
    );
  }

  notify(notification) {
    const {notify} = this.props;

    notify(notification);
  }

  closeNotification(id) {
    const {closeNotification} = this.props;

    closeNotification(id);
  }
}

function mapStateToProps(state) {
  const {$$notifiable} = state;

  return {
    $$notifiable: $$notifiable || state
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...actionCreators}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
