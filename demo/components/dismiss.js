import React from 'react';
import {notifiable} from '../../src/';

class Dismiss extends React.Component {
  render() {
    const {notify} = this.props;
    return (
      <div>
        <h3>Dismiss</h3>
        <button onClick={() => {
          notify({
            title: 'Dismiss Title', message: '2 seconds to read', dismissTimeout: 2000
          });
        }}>2 seconds dismiss</button>

        <button onClick={() => {
          notify({
            title: 'Dismiss Title', message: 'This notification will not dismiss', dismiss: false
          });
        }}>Don't dismiss</button>
        <p>
          You can manage how long your notification will take to dismiss, or maybe don't dismiss at all
        </p>
        <hr/>
      </div>
    );
  }
}

export default notifiable()(Dismiss);
