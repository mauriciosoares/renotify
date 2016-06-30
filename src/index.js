import React from 'react';
import {render} from 'react-dom';
import NotificationContainer from './notification-container.js';
import notification from './notification';

class Container extends React.Component {
  render() {
    return (
      <NotificationContainer>
        <ComposedComponent />
      </NotificationContainer>
    )
  }
}

class InnerComponent extends React.Component {
  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.props.notify({title: +new Date()})
          }}>notification!</button>
      </div>
    );
  }
}

const ComposedComponent = notification(InnerComponent);

document.body.appendChild(document.createElement('div'));
render(<Container />, document.querySelector('div'));
