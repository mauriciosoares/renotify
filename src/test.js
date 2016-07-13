import React from 'react';
import {render} from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {NotificationContainer, notifiable} from './';

class Container extends React.Component {
  render() {
    return (
      <NotificationContainer>
        <InnerComponent />
      </NotificationContainer>
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

InnerComponent = notifiable(InnerComponent)

document.body.appendChild(document.createElement('div'));
render(<Container />, document.querySelector('div'));
