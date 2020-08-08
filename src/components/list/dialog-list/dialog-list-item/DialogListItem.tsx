import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import dateFormat from 'dateformat';

import './DialogListItem.css';
import {RoundImage} from '../../../common/round-image/RoundImage';
import {loadMessages} from '../../../../redux/messages/actions';
import {selectDialog} from '../../../../redux/dialogs/actions';
import {DialogItem} from '../../../../redux/dialogs/reducers';
import {RootState} from '../../../../redux/rootReducer';
import {getPayload} from '../../../../util/jwt.util';

interface Props {
  dialog: DialogItem;
}

export const DialogListItem: React.FC<Props> = (props) => {
  const [dialog] = useState(props.dialog);
  const [user] = useState(getPayload());

  const selectedDialogId = useSelector((state: RootState) => state.dialogs.selectedDialog?.id);

  const dispatch = useDispatch();

  let dialogAvatar: string = '';
  let dialogName: string = '';
  let messageDate: string = '';
  let messageOwner: string = '';
  let messageText: string = '';
  if (dialog.type === 'dialog') {
    const dialogUser = dialog.users[0];
    if (dialogUser) {
      dialogAvatar = dialogUser.avatar && dialog.users[0].avatar;
      dialogName = (dialogUser.firstName + ' ' + (dialogUser.lastName ? dialogUser.lastName : '')).trim();
    }
    const lastMessage = dialog.messages[0];
    if (lastMessage) {
      const createdDate = new Date(lastMessage.createdDate);
      if (createdDate.getDay() === new Date().getDay()) {
        messageDate = dateFormat(createdDate, 'h:MM TT');
      } else {
        messageDate = dateFormat(createdDate, 'ddd');
      }
      messageOwner = user?.sub === lastMessage.owner.id ? '' : lastMessage.owner.firstName + ': ';
      messageText = lastMessage.text;
    }
  }

  const select = () => {
    dispatch(selectDialog(props.dialog));
    dispatch(loadMessages(props.dialog.id));
  }

  return (
    <li className={"dialog-item" + (dialog.id === selectedDialogId ? " selected" : "")} onClick={select}>
      <RoundImage avatar={dialogAvatar} title={dialogName} width={48} height={48}
                  fontSize={18}/>

      <div className="information">
        <div className="dialog-peer">
          <span className="dialog-name">{dialogName}</span>
          <span className="message-date">{messageDate}</span>
        </div>
        <div className="dialog-message">
            <span className="message">
              <span className="message-owner">{messageOwner}</span>
              {messageText}
            </span>
        </div>
      </div>
    </li>
  );
}
