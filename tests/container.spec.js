import React from 'react';
import Container from '../src/container';
import {shallow} from 'enzyme';
import {NOTIFICATION_SHAPE} from '../src/reducerAndActions';

describe('Container', () => {
  it('should configure the redux store if its not passed', () => {
    const wrapper = shallow(<Container />);

    expect(wrapper.instance().store).toBeDefined();
    expect(wrapper.instance().store.getState()).toEqual({
      notifications: []
    });
  });

  it('should configure the redux store if its passed but does not have the $$renotify reducer', () => {
    const wrapper = shallow(<Container />, {
      context: {
        store: {
          subscribe: () => {},
          dispatch: () => {},
          getState: () => {
            return {
              someReducer: {}
            };
          }
        }
      }
    });

    expect(wrapper.instance().store).toBeDefined();
    expect(wrapper.instance().store.getState()).toEqual({
      notifications: []
    });
  });

  it('should use the passed store', () => {
    const wrapper = shallow(<Container />, {
      context: {
        store: {
          subscribe: () => {},
          dispatch: () => {},
          getState: () => {
            return {
              $$renotify: {notifications: []},
              someReducer: {}
            };
          }
        }
      }
    });

    expect(wrapper.instance().store).toBeDefined();
    expect(wrapper.instance().store.getState()).toEqual({
      someReducer: {},
      $$renotify: {
        notifications: []
      }
    });
  });

  it('should update the default notification shape if the `notificationShape` prop is passed', () => {
    shallow(<Container notificationShape={{title: 'Custom Title'}} />);

    expect(NOTIFICATION_SHAPE.title).toEqual('Custom Title');
  });
});
