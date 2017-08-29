import {NOTIFICATION_SHAPE, NOTIFY} from '../src/reducerAndActions';
import createMiddleware from '../src/middleware';

const MAPPED_ACTION = 'MAPPED_ACTION';
const NOT_MAPPED_ACTION = 'NOT_MAPPED_ACTION';

const testNotification = {
  id: 'custom-id',
  title: 'Some custom title',
  message: 'Some custom message'
};

const middleware = createMiddleware({
  [MAPPED_ACTION]: testNotification
});

const fakeStore = {
  dispatch(action) {
    this.state = action;
  },

  state: null
};

function fakeNext() {}

describe('Middleware', () => {
  it('Should not dispatch a new notification if its not configured', () => {
    middleware(fakeStore)(fakeNext)({type: NOT_MAPPED_ACTION});

    expect(fakeStore.state).toEqual(null);
  });

  it('Should dispatch a new notification if its configured', () => {
    middleware(fakeStore)(fakeNext)({type: MAPPED_ACTION});

    expect(fakeStore.state).toEqual({
      type: NOTIFY,
      notification: {
        ...NOTIFICATION_SHAPE,
        ...testNotification
      }
    });
  });
});
