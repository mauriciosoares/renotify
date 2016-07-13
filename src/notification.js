import React from 'react';
import {connect} from 'react-redux';

class Notification extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div>
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
