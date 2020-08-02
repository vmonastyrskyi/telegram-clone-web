import React, {FormEvent} from 'react';

import './MessageInput.css';
import {RoundImage} from "../../round-image/RoundImage";

interface Props {
}

export const MessageInput: React.FC<Props> = () => {
  const autoResize = (e: FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.target as HTMLTextAreaElement;
    textarea.style.height = '20px';
    textarea.style.height = textarea.scrollHeight + 'px'
  }

  return (
    <div className="message-input-container">
      <div className="image-from">
        <RoundImage image={"https://instamir.info/wp-content/uploads/2019/04/instami-avatarka-v-instagram-22.png"} title={"Иван Васильевич"} width={52} height={52} fontSize={18}/>
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
        <RoundImage image={"https://instamir.info/wp-content/uploads/2019/04/instami-avatarka-v-instagram-13.png"} title={"Пользователь"} width={52} height={52} fontSize={18}/>
      </div>
    </div>
  );
}
