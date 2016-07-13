import React from 'react';
import {connect} from 'react-redux';

class Notification extends React.Component {
  componentDidMount() {
    // setInterval(() => {
      // console.log(this.props);
    // }, 500);
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default connect(s => s)(Notification);
