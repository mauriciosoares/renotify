import uuid from 'uuid';

const NOTIFY = '@@react-yell/NOTIFY';
const initialState = {
  notifications: []
}

export function notify(n) {
  return {
    type: NOTIFY,
    notification: {
      ...n,
      id: uuid.v4()
    }
  }
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case NOTIFY:
      state = {
        notifications: [...state.notifications, action.notification]
      };
      return state;
    default:
      return state;
  }
}
