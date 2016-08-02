import reducer, {
  NOTIFY,
  CLOSE_NOTIFICATION,
  NOTIFICATION_SHAPE,
  updateNotificationShape,
  notify,
  closeNotification
} from '../src/reducerAndActions';

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
      type: 'danger',
      Template: null
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

    it('should merge the structure of the notification with the default', () => {
      const notification = {
        title: 'custom title',
        message: 'custom message'
      };
      const output = notify(notification);

      expect(output).toEqual({
        type: NOTIFY,
        notification: {
          id: output.notification.id,
          ...NOTIFICATION_SHAPE,
          ...notification
        }
      });
    });

    it('should set a custom ID for the notification, in case its set', () => {
      const customId = 'custom-id';
      const output = notify({id: customId});

      expect(output.notification.id).toEqual(customId);
    });
  });

  describe('closeNotification', () => {
    it('should return the action with the sent ID', () => {
      const id = 'custom-id';
      const output = closeNotification(id);

      expect(output).toEqual({
        type: CLOSE_NOTIFICATION,
        id
      });
    });
  });
});
