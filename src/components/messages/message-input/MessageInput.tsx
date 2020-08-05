import React, {FormEvent, KeyboardEvent, useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';

import './MessageInput.css';
import {RoundImage} from '../../round-image/RoundImage';
import {RootState} from '../../../redux/rootReducer';
import {getPayload} from '../../../util/jwt.util';

interface Props {
}

export const MessageInput: React.FC<Props> = () => {
  const selectedDialog = useSelector((state: RootState) => state.dialogs.selectedDialog);
  const socket = useSelector((state: RootState) => state.app.socket);

  const messageInput = useRef<HTMLTextAreaElement>(null);

  const user = getPayload();

  useEffect(() => {
    messageInput.current!.focus();
  })

  const autoResize = (e: FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.target as HTMLTextAreaElement;
    textarea.style.height = '20px';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  const sendMessage = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = e.target as HTMLTextAreaElement;
    if (!e.shiftKey && e.key === 'Enter') {
      e.preventDefault();
      if (textarea.value.length > 0) {
        console.log('send message');
        socket?.emit('msgToServer', JSON.stringify(textarea.value));
        textarea.value = '';
        autoResize(e);
      }
    }
  }

  if (user && selectedDialog) {
    const userAvatar = user.avatar;
    const userName = user.first_name + (user.last_name ? ' ' + user.last_name : '').trim();
    let dialogAvatar: string | undefined = undefined;
    let dialogName: string | undefined = undefined;
    if (selectedDialog.type === 'dialog') {
      dialogAvatar = selectedDialog.users[0].avatar;
      dialogName = selectedDialog.users[0].firstName + (selectedDialog.users[0].lastName ? ' ' + selectedDialog.users[0].lastName : '').trim();
    }

    return (
      <div className="message-input-container">
        <div className="image-from">
          <RoundImage avatar={userAvatar}
                      title={userName}
                      width={52}
                      height={52}
                      fontSize={18}/>
        </div>
        <div className="user-input">
        <textarea ref={messageInput}
                  onInput={autoResize}
                  onKeyPress={sendMessage}
                  className="message-textarea"
                  placeholder="Write a message..."
                  autoFocus={true}
                  rows={3}/>
          <span className="material-icons emoji-icon">sentiment_satisfied_alt</span>

          <div className="buttons">
            <div>
              <button className="send-file"><span className="material-icons">attachment</span></button>
              <button className="send-media"><span className="material-icons">photo_camera</span></button>
            </div>
            <button className="send-message-btn">SEND</button>
          </div>
        </div>
        <div className="image-to">
          <RoundImage avatar={dialogAvatar}
                      title={dialogName}
                      width={52}
                      height={52}
                      fontSize={18}/>
        </div>
      </div>
    );
  }
  return <></>;
}
