import {LOAD_DIALOGS, PUT_DIALOGS, SELECT_DIALOG} from './types';
import {DialogItem} from './reducers';

export const loadDialogs = () => {
  return {type: LOAD_DIALOGS};
}

export const putDialogs = (dialogs: DialogItem[]) => {
  return {type: PUT_DIALOGS, payload: dialogs};
}

export const selectDialog = (dialog: DialogItem) => {
  return {type: SELECT_DIALOG, payload: dialog};
}
