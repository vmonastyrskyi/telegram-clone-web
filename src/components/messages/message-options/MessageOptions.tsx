import React from 'react';

import './MessageOptions.css';

interface Props {
  checkedAmount: number,
  closeOptions: any
}

export const MessageOptions: React.FC<Props> = (props) => {
  const closeOptions = () => {
    props.closeOptions();
  }

  return (
    <div className="message-options">
      <div className="options-buttons">
        <button>Forward <span>{props.checkedAmount}</span></button>
        <button>Delete <span>{props.checkedAmount}</span></button>
        <button>Reply</button>
        <button>Edit</button>
      </div>
      <div className="cancel-btn">
        <button onClick={closeOptions}>Cancel</button>
      </div>
    </div>
  );
}
