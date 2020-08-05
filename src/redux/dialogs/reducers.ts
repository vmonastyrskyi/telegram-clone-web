import {PUT_DIALOGS, SELECT_DIALOG} from './types';
import {Dialog} from "./sagas";

export interface DialogItem extends Dialog {
  isSelected: boolean;
}

interface State {
  items: DialogItem[];
  selectedDialog: DialogItem | undefined;
}

const initialState: State = {
  items: [],
  selectedDialog: undefined
}

export const dialogsReducer = (state: State = initialState, action: any): State => {
  switch (action.type) {
    case PUT_DIALOGS:
      return {
        ...state,
        items: action.payload
      };
    case SELECT_DIALOG:
      return {
        ...state,
        selectedDialog: action.payload
      };
    default:
      return state;
  }
}
