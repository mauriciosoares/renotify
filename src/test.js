import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import {NotificationContainer, notification} from './';

function reducer(state = {test: true}, action) {
  return state;
}

const store = createStore(reducer);

class Container extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NotificationContainer>
          <InnerComponent />
        </NotificationContainer>
      </Provider>
    );
  }
}

class InnerComponent extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this._handleClick}>test</button>
      </div>
    );
  }

  _handleClick = () => {
    this.props.notify({title: +new Date()});
  }
}

InnerComponent = connect(s => s)(notification(InnerComponent));

document.body.appendChild(document.createElement('div'));
render(<Container />, document.querySelector('div'));
