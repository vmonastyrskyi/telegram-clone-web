import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import './DialogListItem.css';
import {RoundImage} from '../../round-image/RoundImage';
import {loadMessages} from '../../../redux/messages/actions';
import {selectDialog} from "../../../redux/dialogs/actions";
import {DialogItem} from "../../../redux/dialogs/reducers";
import {RootState} from "../../../redux/rootReducer";
import dateFormat from "dateformat";

interface Props {
  dialog: DialogItem;
}

export const DialogListItem: React.FC<Props> = (props) => {
  const [dialog] = useState(props.dialog);

  const selectedDialogId = useSelector((state: RootState) => state.dialogs.selectedDialog?.id);

  const dispatch = useDispatch();

  let avatar: string = '';
  let title: string = '';
  let date: string = '';
  let owner: string = '';
  let text: string = '';
  if (dialog.type === 'dialog') {
    const dialogUser = dialog.users[0];
    if (dialogUser) {
      avatar = dialogUser.avatar && dialog.users[0].avatar;
      title = (dialogUser.firstName + ' ' + (dialogUser.lastName ? dialogUser.lastName : '')).trim();
    }
    const lastMessage = dialog.messages[0];
    if (lastMessage) {
      date = dateFormat(lastMessage.createdDate, 'h:MM TT');
      owner = lastMessage.owner.firstName;
      text = lastMessage.text;
    }
  }

  const select = () => {
    dispatch(selectDialog(props.dialog));
    dispatch(loadMessages(props.dialog.id));
  }

  return (
    <li className={"dialog-item" + (dialog.id === selectedDialogId ? " selected" : "")} onClick={select}>
      <RoundImage avatar={avatar} title={title} width={48} height={48}
                  fontSize={18}/>

      <div className="information">
        <div className="dialog-peer">
          <span className="dialog-name">{title}</span>
          <span className="last-message-date">{date}</span>
        </div>
        <div className="dialog-message">
            <span className="last-message">
              <span className="last-message-owner">{owner}: </span>
              {text}
            </span>
        </div>
      </div>
    </li>
  );
}
