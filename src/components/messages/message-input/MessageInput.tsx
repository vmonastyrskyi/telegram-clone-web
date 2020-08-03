import React, {FormEvent} from 'react';

import './MessageInput.css';
import {RoundImage} from "../../round-image/RoundImage";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/rootReducer";
import {getPayload} from "../../../util/jwt.util";

interface Props {
}

export const MessageInput: React.FC<Props> = () => {
  const selectedDialog = useSelector((state: RootState) => state.dialogs.selectedDialog);

  const currentUser = getPayload();

  const autoResize = (e: FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.target as HTMLTextAreaElement;
    textarea.style.height = '20px';
    textarea.style.height = textarea.scrollHeight + 'px'
  }

  if (currentUser && selectedDialog) {
    return (
      <div className="message-input-container">
        <div className="image-from">
          <RoundImage avatar={currentUser.avatar}
                      title={currentUser.first_name + ' ' + currentUser.last_name}
                      width={52}
                      height={52}
                      fontSize={18}/>
        </div>
        <div className="user-input">
        <textarea className="message-textarea"
                  placeholder="Write a message..."
                  autoFocus={true}
                  onInput={autoResize}
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
          <RoundImage avatar={selectedDialog.users[0].avatar}
                      title={selectedDialog.users[0].firstName + ' ' + selectedDialog.users[0].lastName}
                      width={52}
                      height={52}
                      fontSize={18}/>
        </div>
      </div>
    );
  }
  return <></>;
}
