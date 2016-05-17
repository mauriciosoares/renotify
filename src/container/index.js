import React from 'react';

class YellContainer extends React.Component {
  static childContextTypes = {
    yell: React.PropTypes.func
  }

  constructor(props) {
    super(props);

    this._yell = this._yell.bind(this);
  }

  getChildContext() {
    return {
      yell: this._yell
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }

  _yell() {
    console.log('yelling at something');
  }
}

export default YellContainer;
