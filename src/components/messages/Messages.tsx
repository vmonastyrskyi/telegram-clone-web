import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/rootReducer';

import './Messages.css';
import {MessageInput} from './message-input/MessageInput';
import {MessageList} from './message-list/MessageList';
import {HistoryTyping} from './history-typing/HistoryTyping';
import {MessageOptions} from "./message-options/MessageOptions";

interface Props {
}

export interface IMessage {
  id: number,
  messageOwner: string
  text: string,
  image: string,
  date: string,
  isRead: boolean,
  isChecked: boolean,
  isSameOwner: boolean
}

export const Messages: React.FC<Props> = () => {
  const messages = useSelector((state: RootState) => state.messages.items);
  const [isCheckingMessages, setIsCheckingMessages] = useState(false);
  const [checkedAmount, setCheckedAmount] = useState(0);

  const onCheckedMessages = (id: number, checked: boolean) => {
    messages.find(message => message.id === id)!.isChecked = checked;
    const checkedMessages = messages.filter(message => message.isChecked);
    setIsCheckingMessages(checkedMessages.length > 0);
    setCheckedAmount(checkedMessages.length);
  }

  const closeOptions = () => {
    messages.forEach(message => message.isChecked = false);
    setIsCheckingMessages(false);
    setCheckedAmount(0);
  }

  return (
    <div className="messages_container">
      <MessageList
        isCheckingMessages={isCheckingMessages}
        checkMessages={onCheckedMessages}
        messages={messages}
      />
      <HistoryTyping/>
      {!isCheckingMessages ?
        <MessageInput/> :
        <MessageOptions
          checkedAmount={checkedAmount}
          closeOptions={closeOptions}
        />
      }
    </div>
  );
}
