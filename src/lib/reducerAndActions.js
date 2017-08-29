import uuid from 'uuid';

export const NOTIFY = '@@renotify/NOTIFY';
export const CLOSE_NOTIFICATION = '@@renotify/CLOSE_NOTIFICATION';
export let NOTIFICATION_SHAPE = {
  dismiss: true,
  dismissTimeout: 5000,
  actions: [{
    label: 'Dismiss'
  }],
  type: 'success',
  Template: null
};
const initialState = {
  notifications: []
};

export function updateNotificationShape(template) {
  NOTIFICATION_SHAPE = {
    ...NOTIFICATION_SHAPE,
    ...template
  };
}

export function notify(n) {
  const id = n.id || uuid.v4();

  return {
    type: NOTIFY,
    notification: {
      ...NOTIFICATION_SHAPE,
      ...n,
      id
    }
  };
}

export function closeNotification(id) {
  return {
    type: CLOSE_NOTIFICATION,
    id
  };
}

export const actionCreators = {
  notify,
  closeNotification
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case NOTIFY:
      state = {
        notifications: [...state.notifications, action.notification]
      };
      return state;

    case CLOSE_NOTIFICATION:
      state = {
        notifications: state.notifications.filter(({id}) => id !== action.id)
      };
      return state;

    default:
      return state;
  }
}
