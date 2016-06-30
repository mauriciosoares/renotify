import React from 'react';
import notification from '../notification.js';

function Notification({
  title,
  id,
  closeNotification
}) {
  return (
    <div className="react-notification__item" onClick={() => {closeNotification(id)}}>
      {title}
    </div>
  );
}

export default notification(Notification);
