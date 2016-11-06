import React from 'react';
import {renotify} from '../../src/';

class Hooks extends React.Component {
  render() {
    const {notify} = this.props;
    return (
      <div>
        <h3>Hooks</h3>
        <button onClick={() => {
          notify({
            title: 'Simple Title',
            message: 'Simple Message',
            onAdd: () => console.log('Component entering'),
            onRemove: () => console.log('Component leaving'),
          });
        }}>Notify</button>
        <p>
          You can attach hooks for when your component is entering, and leaving (check your console)
        </p>
        <hr/>
      </div>
    );
  }
}

export default renotify()(Hooks);
