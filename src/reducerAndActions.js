const NOTIFY = '@@react-yell/NOTIFY';
const initialState = {
  notifications: []
}

export function notify(notification) {
  return {
    type: NOTIFY,
    notification
  }
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case NOTIFY:
      state = [...state, notification];
      return state;
    default:
      return state;
  }
}
