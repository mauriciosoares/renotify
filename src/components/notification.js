import React from 'react';
import yell from '../yell.js';

function Notification({
  title,
  id,
  closeYell
}) {
  return (
    <div className="react-yell__notification" onClick={() => {closeYell(id)}}>
      {title}
    </div>
  );
}

export default yell(Notification);
