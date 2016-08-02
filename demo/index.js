import React from 'react';
import {render} from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {NotificationContainer, reducer, createMiddleware} from '../src/';
import Simple from './components/simple';
import Dismiss from './components/dismiss';
import Hooks from './components/hooks';
import MultipleActions from './components/multiple-actions';
import Types from './components/types';
import Template from './components/template';
import './index.scss';

function someCustomReducer() {
  return {};
}

const reducers = combineReducers({
  someCustomReducer,
  $$notifiable: reducer
});

const notifiableMiddleware = createMiddleware({
  MIDDLEWARE: {
    title: 'Middleware Notification',
    message: 'This notification is automagically comming from a middleware'
  }
});

const store = createStore(reducers, applyMiddleware(notifiableMiddleware));

class Container extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NotificationContainer>
          <div>
            <Simple />
            <Dismiss />
            <Hooks />
            <MultipleActions />
            <Types />
            <Template />
          </div>
        </NotificationContainer>
      </Provider>
    );
  }
}

document.body.appendChild(document.createElement('div'));
render(<Container />, document.querySelector('div'));
