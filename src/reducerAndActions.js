import uuid from 'uuid';

const NOTIFY = '@@react-yell/NOTIFY';
const CLOSE_NOTIFICATION = '@@react-yell/CLOSE_NOTIFICATION';
const initialState = {
  notifications: []
}

function notify(n) {
  return {
    type: NOTIFY,
    notification: {
      ...n,
      id: uuid.v4()
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
