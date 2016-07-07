const NOTIFY = '@@react-yell/NOTIFY';
const initialState = []

export function notify(notification) {
  return {
    type: NOTIFY,
    notification
  }
}

export default function reducer(state, action) {
  switch(action.type) {
    case NOTIFY:
      state = [...state, notification];
      return state;
    default:
      return state;
  }
}
