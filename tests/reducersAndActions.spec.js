import reducer, {NOTIFY, CLOSE_NOTIFICATION} from '../src/reducerAndActions.js';

describe('Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ // eslint-disable-line no-undefined
      notifications: []
    });
  });

  it('should add a new notification', () => {
    const notification = {
      title: 'title',
      message: 'message'
    };

    expect(reducer(undefined, {type: NOTIFY, notification})).toEqual({  // eslint-disable-line no-undefined
      notifications: [notification]
    });
  });

  it('should add a new notification', () => {
    const id = 1234;
    const notification = {
      id,
      title: 'title',
      message: 'message'
    };

    const state = {
      notifications: [notification]
    };

    expect(reducer(state, {type: CLOSE_NOTIFICATION, id})).toEqual({ // eslint-disable-line no-undefined
      notifications: []
    });
  });
});
