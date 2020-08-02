import React, {useEffect, useRef, useState} from 'react';

import './MessageListItem.css';
import {IMessage} from "../Messages";
import {RoundImage} from "../../round-image/RoundImage";

interface Props {
  message: IMessage,
  checkMessage: any,
  isCheckingMessages: boolean
}

export const MessageListItem: React.FC<Readonly<Props>> = React.memo((props) => {
  const [message] = useState(props.message);
  const [isChecked, setIsChecked] = useState(false);
  const [isSameOwner] = useState(message.isSameOwner);
  const [isRead] = useState(message.isRead);

  const li = useRef<HTMLLIElement>(null);

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
          {!isSameOwner && <RoundImage image={message.image} title={message.messageOwner} width={42} height={42} fontSize={14}/>}
          <div className="message-content">
            {!isSameOwner && <span className="message-owner">{message.messageOwner}</span>}
            <span className="message-text">{message.text}</span>
          </div>
          <div className="message-date">
            <span>{message.date}</span>
          </div>
        </div>
      </div>
    </li>
  );
}, (prevProps: Readonly<Props>, nextProps: Readonly<Props>): boolean => {
  return prevProps.isCheckingMessages === nextProps.isCheckingMessages;
});
