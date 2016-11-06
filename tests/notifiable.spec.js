import React from 'react';
import renotify from '../src/renotify';
import {shallow, mount} from 'enzyme';

const componentNotification = {
  message: 'Some message'
};

class FakeComponent extends React.Component {
  render() {
    return (
      <a className="link" onClick={() => {
        this.props.notify(componentNotification);
      }}>Some Link</a>
    );
  }
}

describe('Renotify', () => {
  it('should return a component with the notify and closeNotification props', () => {
    const RenotifyComponent = renotify()(FakeComponent);

    const wrapper = shallow(<RenotifyComponent />)
    const props = wrapper.props();

    expect(props.hasOwnProperty('notify')).toBe(true);
    expect(props.hasOwnProperty('closeNotification')).toBe(true);
  });

  it('should call the notify method with pre configured shape', () => {
    let notification;

    const shape = {
      title: 'custom title'
    };

    const RenotifyComponent = renotify(shape)(FakeComponent);

    const wrapper = mount(<RenotifyComponent />, {
      context: {
        __notify: n => notification = n
      }
    });

    wrapper.find('a').simulate('click');

    expect(notification).toEqual({
      ...shape,
      ...componentNotification
    });
  });
});
