import {actionCreators} from './reducerAndActions.js';

export default function createMiddleware(mapper) {
  return store => next => action => {
    if(mapper[action.type]) {
      store.dispatch(actionCreators.notify(mapper[action.type]));
    }

    next(action);
  };
}
