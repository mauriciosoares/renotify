import React from 'react';
import {render} from 'react-dom';
import {NotificationContainer, notification} from './';

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

InnerComponent = notification(InnerComponent);

document.body.appendChild(document.createElement('div'));
render(<Container />, document.querySelector('div'));
