import React from 'react';
import {render} from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';
import {NotificationContainer, notification} from './';

function reducer1(state = {test: true}, action) {
  return state;
}

function reducer2(state = {test: true}, action) {
  return state;
}

const reducers = combineReducers({
  reducer1,
  reducer2
})

console.log(reducers);

const store = createStore(reducers);

class Container extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      store.replaceReducer(reducer1);
    }, 2000);
  }
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
