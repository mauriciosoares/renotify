import uuid from 'uuid';

const NOTIFY = '@@react-yell/NOTIFY';
const CLOSE_NOTIFICATION = '@@react-yell/CLOSE_NOTIFICATION';
const NOTIFICATION_BOILERPLATE = {
  dismiss: true,
  dismissTimeout: 5000,
  actions: [{
    label: 'Dismiss'
  }]
};
const initialState = {
  notifications: []
};

function notify(n) {
  const id = n.id || uuid.v4();

  return {
    type: NOTIFY,
    notification: {
      ...NOTIFICATION_BOILERPLATE,
      ...n,
      id
    }
  }
}

function closeNotification(id) {
  return {
    type: CLOSE_NOTIFICATION,
    id
  }
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
