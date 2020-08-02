import React from 'react';

import './DialogList.css';
import {DialogListItem} from "../dialog-list-item/DialogListItem";
import {IDialog} from "../Dialogs";

interface Props {
  dialogs: IDialog[]
}

export const DialogList: React.FC<Props> = (props) => {
  return (
    <ul className="dialogs">
      {props.dialogs && props.dialogs.map(dialog => <DialogListItem key={dialog.id} dialog={dialog}/>)}
    </ul>
  );
}
