import React from 'react';
import {connect} from 'react-redux';

class Notification extends React.Component {
  render() {
    const {title, id} = this.props;

    return (
      <div>
        {title}
      </div>
    );
  }
}

export default connect()(Notification);
