import React from 'react';
import {render} from 'react-dom';
import YellContainer from './yell-container.js';
import yell from './yell';

class Container extends React.Component {
  render() {
    return (
      <YellContainer>
        <YelledInnerComponent />
      </YellContainer>
    )
  }
}

class InnerComponent extends React.Component {
  render() {
    return (
      <div>
        <button onClick={() => {this.props.yell({title: ':D'})}}>Yell!</button>
      </div>
    );
  }
}

const YelledInnerComponent = yell(InnerComponent);

document.body.appendChild(document.createElement('div'));
render(<Container />, document.querySelector('div'));
