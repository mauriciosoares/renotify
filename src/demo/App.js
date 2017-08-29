import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {NotificationProvider, reducer, createMiddleware} from '../lib/';
import Simple from './components/simple';
import Dismiss from './components/dismiss';
import Hooks from './components/hooks';
import MultipleActions from './components/multiple-actions';
import Types from './components/types';
import Template from './components/template';
import '../lib/style.scss';
import './index.scss';

function someCustomReducer() {
  return {};
}

const reducers = combineReducers({
  someCustomReducer,
  $$renotify: reducer
});

const renotifyMiddleware = createMiddleware({
  MIDDLEWARE: {
    title: 'Middleware Notification',
    message: 'This notification is automagically comming from a middleware'
  }
});

const store = createStore(reducers, applyMiddleware(renotifyMiddleware));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NotificationProvider>
          <div>
            <Simple />
            <Dismiss />
            <Hooks />
            <MultipleActions />
            <Types />
            <Template />
          </div>
        </NotificationProvider>
      </Provider>
    );
  }
}
