import React, {PropTypes} from 'react';
import {createStore} from 'redux';
import Notification from './notification';
import reducer from './reducerAndActions';

class Container extends React.Component {
  static contextTypes = {
    store: PropTypes.shape({
      subscribe: PropTypes.func.isRequired,
      dispatch: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired
    })
  }

  constructor(props, context) {
    super()

    if(context.store) {
      this.store = context.store;
    } else {
      this.store = createStore(reducer);
    }
  }

  render() {
    return (
      <Notification store={this.store}>
        {this.props.children}
      </Notification>
    );
  }
}

export default Container;
