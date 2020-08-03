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

// export interface IMessage {
//   id: string;
//   text: string;
//   owner: string;
//   avatar: string;
//   date: string;
//   isRead: boolean;
//   isChecked: boolean;
//   isSameOwner: boolean;
//   isUpdated: boolean;
// }

export const Messages: React.FC<Props> = () => {
  const [isCheckingMessages, setIsCheckingMessages] = useState(false);
  const [checkedAmount, setCheckedAmount] = useState(0);

  const selectedDialog = useSelector((state: RootState) => state.dialogs.selectedDialog);
  const messages = useSelector((state: RootState) => state.messages.items);

  for (let i = 0; i < messages.length - 1; i++) {
    if (messages[i].owner.id === messages[i + 1].owner.id) {
      messages[i + 1].isSameOwner = true;
    }
  }

  const onCheckedMessages = (id: string, checked: boolean) => {
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
    <div className="messages-container">
      {selectedDialog ?
        <>
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
        </> :
        <>
          <div className="no-data">
            Пожалуйста, выберите чат чтобы начать переписку
          </div>
        </>}
    </div>
  );
}
