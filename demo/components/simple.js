import React from 'react';
import {notifiable} from '../../src/';

class Simple extends React.Component {
  render() {
    const {notify} = this.props;
    return (
      <div>
        <h3>Simple Notification</h3>
        <button onClick={() => {
          notify({title: 'Simple Title', message: 'Simple Message'});
        }}>Notify</button>
        <p>
          Simplest notification ever, just pass the title and the message, and you're good to go
        </p>
        <hr/>
      </div>
    );
  }
}

export default notifiable()(Simple);
