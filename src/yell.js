import React from 'react';

export default function(Component) {
  return class YellHoc extends React.Component {
    static contextTypes = {
      yell: React.PropTypes.func
    }

    render() {
      const {yell} = this.context;

      return (
        <Component yell={yell} />
      );
    }
  }
}
