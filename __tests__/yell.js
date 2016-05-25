import React from 'react';
import {shallow} from 'enzyme';

class Test extends React.Component {
  render() {
    return (
      <div>
        test :D
      </div>
    );
  }
}

describe('test', () => {
  it('should do something', () => {
    const wrapper = shallow(<Test />);
    console.log(wrapper.html());
    expect(true).toBe(true);
  })
})
