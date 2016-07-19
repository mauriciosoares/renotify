import React from 'react';
import {render} from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import {NotificationContainer, notifiable, reducer, createMiddleware} from './';

function reducer1() {
  return {};
}

const reducers = combineReducers({
  reducer1,
  $$notifiable: reducer
});

const notifiableMiddleware = createMiddleware({
  TEST: {title: 'HUE MIDDLWARE BRBR', message: 'custom message yay!'}
});

const store = createStore(reducers, applyMiddleware(notifiableMiddleware));

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
    const {dispatch} = this.props;

    return (
      <div>
        <button onClick={this._handleClick}>test</button>
        <button onClick={this._handleMiddleware}>middleware</button>
      </div>
    );
  }

  _handleClick = () => {
    const id = this.props.notify({
      // title: +new Date(),
      message: 'handle message2 :D',
      actions: [{
        label: 1,
        callback() {
          // console.log('callback1');
        }
      }, {
        label: 'close here!'
      }],
      onAdd() {
        // console.log('on adding');
      },
      onRemove() {
        // console.log('removing');
      }
    });

  };

  _handleMiddleware = () => {
    this.props.dispatch({type: 'TEST'});
  };
}

InnerComponent = connect()(notifiable({
  title: 'Configured Title!'
})(InnerComponent));

document.body.appendChild(document.createElement('div'));
render(<Container />, document.querySelector('div'));
