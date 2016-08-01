import React from 'react';
import notifiable from '../src/notifiable';
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

describe('Notifiable', () => {
  it('should return a component with the notify and closeNotification props', () => {
    const NotifiableComponent = notifiable()(FakeComponent);

    const wrapper = shallow(<NotifiableComponent />)
    const props = wrapper.props();

    expect(props.hasOwnProperty('notify')).toBe(true);
    expect(props.hasOwnProperty('closeNotification')).toBe(true);
  });

  it('should call the notify method with pre configured shape', () => {
    let notification;

    const shape = {
      title: 'custom title'
    };

    const NotifiableComponent = notifiable(shape)(FakeComponent);

    const wrapper = mount(<NotifiableComponent />, {
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
