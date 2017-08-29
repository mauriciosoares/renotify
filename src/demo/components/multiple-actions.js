import React from 'react';
import {renotify} from '../../lib/';

class MultipleActions extends React.Component {
  render() {
    const {notify} = this.props;
    return (
      <div>
        <h3>Multiple Actions</h3>
        <button onClick={() => {
          notify({title: 'Title', message: 'Message', actions: [{
            label: 'Alert',
            callback: () => alert('Cheese!')
          }, {
            label: 'Callback Close',
            callback: (closeNotification) => {
              alert('Notification will be closed after this alert');
              closeNotification();
            }
          }, {
            label: 'Close'
          }]});
        }}>Notify</button>
        <p>
          You're able to show multiple actions to the user, and each one of them you can do a different callback, and even close a notification from within a callback. If no callback is specified, the button will close the notification;
        </p>
        <hr/>
      </div>
    );
  }
}

export default renotify()(MultipleActions);
