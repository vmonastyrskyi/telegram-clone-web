import React from 'react';

import './MessageList.css';
import {IMessage} from "../Messages";
import {MessageListItem} from "../message-list-item/MessageListItem";

interface Props {
  messages: IMessage[],
  checkMessages: any,
  isCheckingMessages: boolean
}

export const MessageList: React.FC<Props> = (props) => {
  const onMessageChecked = (id: number, checked: boolean) => {
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
