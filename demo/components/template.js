import React from 'react';
import {renotify} from '../../src/';

const NotificationTemplate = ({title, message, actions}) => (
  <div>
    {title}<br />
    {message}<br />
    {actions}
  </div>
);

class Template extends React.Component {
  render() {
    const {notify} = this.props;
    return (
      <div>
        <h3>Template</h3>
        <button onClick={() => {
          notify({title: 'Template Title', message: 'Template Message', Template: NotificationTemplate});
        }}>Template</button>
        <p>
          It's pretty easy to override React Renotify's default template, simply add a component to the Template property, it'll receive <b>title</b>, <b>message</b> and <b>actions</b> as props.<br />
          You'll have to handle the css on your own though...
        </p>
        <hr/>
      </div>
    );
  }
}

export default renotify()(Template);
