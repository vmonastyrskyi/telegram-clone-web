import React from 'react';

import './DialogListItem.css';
import {RoundImage} from "../../round-image/RoundImage";
import {IDialog} from "../Dialogs";

interface Props {
  dialog: IDialog;
}

export const DialogListItem: React.FC<Props> = (props) => {
  return (
    <li className="dialog-item">
      <RoundImage image={props.dialog.avatar} title={props.dialog.title} width={48} height={48}
                  fontSize={18}/>

      <div className="information">
        <div className="dialog-peer">
          <span className="title">{props.dialog.title}</span>
          <span className="last-message-date">{props.dialog.lastMessageDate}</span>
        </div>
        <div className="dialog-message">
            <span className="last-message">
              <span className="last-message-owner">{props.dialog.lastMessageOwner}: </span>
              {props.dialog.lastMessage}
            </span>
        </div>
      </div>
    </li>
  );
}
