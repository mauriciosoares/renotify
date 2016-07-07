import React from 'react';

class Notification extends React.Component {
  static contextTypes = {
    __theme: React.PropTypes.object
  }

  render() {
    const {title, id} = this.props;
    const {__theme} = this.context
    return (
      <div className={__theme.item}>
        {title}
      </div>
    );
  }
}

export default Notification;
