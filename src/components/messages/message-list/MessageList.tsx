import React from 'react';

import './MessageList.css';
import {MessageListItem} from "../message-list-item/MessageListItem";
import {MessageItem} from "../../../redux/messages/reducers";

interface Props {
  messages: MessageItem[];
  isCheckingMessages: boolean;

  checkMessages(id: string, checked: boolean): void;
}

export const MessageList: React.FC<Props> = (props) => {
  const onMessageChecked = (id: string, checked: boolean) => {
    props.checkMessages(id, checked);
  }

  return (
    <ul className={"messages " + (props.isCheckingMessages ? "is-checking" : "")}>
      {props.messages && props.messages.map(message =>
        <MessageListItem
          key={message.id}
          message={message}
          checkMessage={onMessageChecked}
          isCheckingMessages={props.isCheckingMessages}
        />
      )}
    </ul>
  );
}
