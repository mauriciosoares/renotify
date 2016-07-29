import uuid from 'uuid';

export const NOTIFY = '@@react-yell/NOTIFY';
export const CLOSE_NOTIFICATION = '@@react-yell/CLOSE_NOTIFICATION';
let NOTIFICATION_TEMPLATE = {
  dismiss: true,
  dismissTimeout: 5000,
  actions: [{
    label: 'Dismiss'
  }],
  type: 'success'
};
const initialState = {
  notifications: []
};

export function updateNotificationTemplate(template) {
  NOTIFICATION_TEMPLATE = {
    ...NOTIFICATION_TEMPLATE,
    ...template
  };
}

function notify(n) {
  const id = n.id || uuid.v4();

  return {
    type: NOTIFY,
    notification: {
      ...NOTIFICATION_TEMPLATE,
      ...n,
      id
    }
  };
}

function closeNotification(id) {
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
