# Renotify

> A Redux friendly notification system for React

## Examples

~~You can check some working examples [here](https://mauriciosoares.github.io/renotify/)~~ I'm still creating the `Examples` page :)

## Install

```
npm install renotify -S
```

## Usage

Renotify uses Redux under the hood, and also has some cool features to use with it, but let stick with the basics:

First of all, it's a good idea to import the default styles, to make it look pretty. Don't worry, there are some ways you can customize those.

If you use webpack with a CSS loader:

```javascript
import 'renotify/style.css';
```

Or the old school way:

```html
<link rel="stylesheet" href="node_modules/renotify/style.css">
```

The library interface was heavily inspired by `react-redux`, so in order to use Renotify, you need to wrap your application with the `NotificationContainer` component.

```javascript
import {NotificationContainer} from 'renotify';

function App() {
  return (
    <NotificationContainer>
      <CustomButton />
    </NotificationContainer>
  );
}
```

After that, you should use the high order component `renotify` to wrap the component you want to dispatch notifications:

```javascript
import {renotify} from 'renotify';

function CustomButton({notify}) {
  return (
    <button onClick={() => {
      notify({
        title: 'Some Title',
        message: 'Some message'
      });
    }}>send notification</button>
  );
}

export default renotify()(CustomButton)
```

And that's it! this is the simples way to use Renotify. Now, let's do some cooler stuff.

## Middlewares

Remember the cool features I mentioned that Renotify has with Redux? Here you'll learn how to use the Renotify Middlewares.

The idea of using middlewares with Renotify is to make it easier to show notifications when some particular action is dispatched inside Redux.

#### Renotify reducer

First of all, you should configure the renotify reducer with your application root reducer (Don't worry, Renotify won't mess up with your data).

```javascript
import {reducer} from 'renotify';

const reducers = combineReducers({
  yourReducer,
  $$renotify: reducer // The property name MUST be $$renotify
});
```

#### Middleware

Now you can configure the Renotify middleware, to map all the actions you want to trigger a notification, and the notification configs.

```javascript
import {createMiddleware} from 'renotify';

const renotifyMiddleware = createMiddleware({
  SOME_ACTION: {
    title: 'Middleware Notification',
    message: 'This notification is automagically comming from a middleware'
  }
});
```

After that you can configure the redux store, and pass it to the `Provider`.

```javascript
const store = createStore(reducers, applyMiddleware(renotifyMiddleware));

function App() {
  render() {
    return (
      <Provider store={store}>
        <NotificationContainer>
          <CustomButton />
        </NotificationContainer>
      </Provider>
    );
  }
}
```

Now every time the `SOME_ACTION` actions is triggered, a notification will appear for the user, no need to manually trigger the `notify` method. Yay!

Configuring the reducer internally in your application is only useful when you want to use the middleware.

## renotify high order component default configs

The `renotify` high order component accepts some default configuration for the notifications triggered by that component. Let's take the `CustomButton` as an example:

```javascript
export default renotify({
  Title: 'Default Title'
})(CustomButton);
```

Now if you don't provide the `title` property for the notifications inside `CustomButton`, by default it'll have the text `Default Title`

## NotificationContainer default configs

Similar to the previous topic, you can also provide some default configuration for all the notifications that will be triggered on your application:

```javascript
<NotificationContainer notificationShape={{
  title: 'Default Title',
  message: 'Default Message'
}}>
  <CustomButton />
</NotificationContainer>
```

## notify API

So, there are a couple of things you can do with the `notify` method:

#### Dismiss configuration

You can configure the timeout for the notification to disappear:

```javascript
notify({
  title: '...',
  message: '...',
  dismissTimeout: 2000 // Notification will disappear in 2 seconds
});
```

Or you can configure it to never automatically be dismissed, only when the user clicks in the "dismiss" button:

```javascript
notify({
  title: '...',
  message: '...',
  dismiss: false // Setting this to false will disable the automatic dismiss.
});
```

#### Hooks

You can attach 2 simple hooks to the notification, when it's created:

```javascript
notify({
  title: '...',
  message: '...',
  onAdd: () => console.log('Notification entering'), // triggered when the notification enters
  onRemove: () => console.log('Notification leaving'), // triggered when the notification is about to leave
});
```

#### Custom Actions

You don't need to use the automatic `dismiss` button for everything... You can easily customize these using the `actions` property.

```javascript
notify({
  title: '...',
  message: '...',
  actions: [{
    label: 'Alert', // `label` is the text that will appear in the button
    callback: () => { // `callback` will be triggered once the button is clicked
      // This callback simply alerts `Cheese!`, and won't dismiss the notification
      alert('Cheese!')
    }
  }, {
    label: 'Callback Close',
    // the `closeNotification` method is passed as parameter to the callback
    callback: (closeNotification) => {
      alert('Notification will be closed after this alert');
      closeNotification(); // Dismisses the notification
    }
  }, {
    // If no `callback` is provided, it will dimiss the notification once the button is clicked
    label: 'Close'
  }]
});
```

## Custom templates

You don't need to use the default template if you don't want to... You can create a hole new template for the notifications:

```javascript
// Template must be a valid React Component
// it'll receives `title`, `message` and `actions` as props
const NotificationTemplate = ({title, message, actions}) => (
  <div>
    {title}<br />
    {message}<br />
    {actions}
  </div>
);

notify({
  title: '...',
  message: '...',
  Template: NotificationTemplate
});
```

## Types

As an easy to use solution, Renotify provides 3 different types of notifications out of the box.

```javascript
notify({
  title: '...',
  message: '...',
  type: 'success' // You can also use `warning` or `danger`
});
```
