import React from 'react';
import {render} from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import {NotificationContainer, notifiable, reducer, createMiddleware} from '../src/';
import './index.scss';

function reducer1() {
  return {};
}

const reducers = combineReducers({
  reducer1,
  $$notifiable: reducer
});

const notifiableMiddleware = createMiddleware({
  TEST: {title: 'Middlware rocks!', message: 'this is a <i>custom message</i> comming automagically from the middleware, and it rocks!'}
});

const store = createStore(reducers, applyMiddleware(notifiableMiddleware));

class Container extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NotificationContainer notificationShape={{
          dismiss: false,
          actions: [{
            label: 'Fechar'
          }]
        }}>
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
      message: 'This is a custom message, and its a pretty nice message',
      type: 'warning',
      actions: [{
        label: 1,
        callback(closeNotification) {
          closeNotification();
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
