import reducer, {
  NOTIFY,
  CLOSE_NOTIFICATION,
  NOTIFICATION_SHAPE,
  updateNotificationShape,
  notify
} from '../src/reducerAndActions.js';

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

describe('Util', () => {
  it('should update the notifications default shape', () => {
    const newNotificationShape = {
      dismiss: false,
      dismissTimeout: 1000,
      actions: [{
        label: 'Test'
      }],
      type: 'danger'
    };

    updateNotificationShape(newNotificationShape);

    expect(NOTIFICATION_SHAPE).toEqual(newNotificationShape);
  });
});

describe('Actions', () => {
  describe('notify', () => {
    it('should return a new notification with default shape', () => {
      const output = notify({});

      expect(output).toEqual({
        type: NOTIFY,
        notification: {
          id: output.notification.id,
          ...NOTIFICATION_SHAPE
        }
      });
    });
  });
});
