import React from 'react';

import './DialogList.css';
import {DialogListItem} from "./dialog-list-item/DialogListItem";
import {DialogItem} from "../../../redux/dialogs/reducers";

interface Props {
  dialogs: DialogItem[];
}

export const DialogList: React.FC<Props> = (props) => {
  return (
    <ul className="dialogs">
      {props.dialogs && props.dialogs.map(dialog => <DialogListItem key={dialog.id} dialog={dialog}/>)}
    </ul>
  );
}
