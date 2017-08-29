import React from 'react';
import {renotify} from '../../lib/';

class Types extends React.Component {
  render() {
    const {notify} = this.props;
    return (
      <div>
        <h3>Types</h3>
        <button onClick={() => {
          notify({title: 'success', type: 'success'});
        }}>Success</button>
        <button onClick={() => {
          notify({title: 'warning', type: 'warning'});
        }}>Warning</button>
        <button onClick={() => {
          notify({title: 'danger', type: 'danger'});
        }}>Danger</button>
        <p>
          React Renotify comes with 3 default types, <b>success</b>, <b>warning</b> and <b>danger</b>, but you can create your custom type in no time!
        </p>
        <hr/>
      </div>
    );
  }
}

export default renotify()(Types);
