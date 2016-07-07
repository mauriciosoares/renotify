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

export default connect(s => s)(Notification);
