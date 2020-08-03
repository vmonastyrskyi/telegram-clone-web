import React, {useEffect, useRef, useState} from 'react';
import dateFormat from 'dateformat';

import './MessageListItem.css';
import {RoundImage} from '../../round-image/RoundImage';
import {MessageItem} from '../../../redux/messages/reducers';

interface Props {
  message: MessageItem;
  isCheckingMessages: boolean;

  checkMessage(id: string, checked: boolean): void;
}

export const MessageListItem: React.FC<Readonly<Props>> = React.memo((props) => {
  const [message] = useState(props.message);
  const [isChecked, setIsChecked] = useState(false);
  const [isSameOwner] = useState(message.isSameOwner);
  const [isRead] = useState(message.isRead);

  const li = useRef<HTMLLIElement>(null);

  const date = dateFormat(message.createdDate, 'h:MM:ss TT');

  useEffect(() => {
    if (!props.isCheckingMessages) {
      li.current!.classList.remove('checked');
      setIsChecked(false);
    }
  }, [props.isCheckingMessages]);

  const checkMessage = () => {
    const checked = !isChecked;
    checked ? li.current!.classList.add('checked') : li.current!.classList.remove('checked');
    props.checkMessage(message.id, checked);
    setIsChecked(checked);
  }

  return (
    <li ref={li}
        className={"message-item " + (isSameOwner ? "same-owner" : "")}
        onClick={checkMessage}>
      <div>
        <div className="message-statuses">
          <span className="material-icons checked-status">check_circle</span>
          <span className={"read-status " + (isRead ? "read" : "")}/>
        </div>
        <div className="message-body">
          {!isSameOwner &&
          <RoundImage avatar={message.owner.avatar} title={message.owner.firstName + ' ' + message.owner.lastName}
                      width={42} height={42} fontSize={14}/>}
          <div className="message-content">
            {!isSameOwner && <span className="message-owner">{message.owner.firstName}</span>}
            <span className="message-text">{message.text}</span>
          </div>
          <div className="message-date">
            <span>{date}</span>
          </div>
        </div>
      </div>
    </li>
  );
}, (prevProps: Readonly<Props>, nextProps: Readonly<Props>): boolean => {
  return prevProps.isCheckingMessages === nextProps.isCheckingMessages;
});
