import React from 'react';
import {connect} from 'react-redux';
import Items from './components/items';

class Notification extends React.Component {
  render() {
    const {notifications} = this.props.$$notifiable

    return (
      <div>
        <Items notifications={notifications} />
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {$$notifiable} = state;

  return {
    $$notifiable: $$notifiable || state
  };
}

export default connect(mapStateToProps)(Notification);
