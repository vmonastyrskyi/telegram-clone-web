import {IDialog} from '../../components/dialogs/Dialogs';
import {PUT_DIALOGS} from './types';

interface State {
  items: IDialog[]
}

const initialState: State = {
  items: []
}

export const dialogsReducer = (state: State = initialState, action: any): State => {
  switch (action.type) {
    case PUT_DIALOGS:
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
}
