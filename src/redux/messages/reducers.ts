import {PUT_MESSAGES} from './types';
import {Message} from "./sagas";

export interface MessageItem extends Message {
  isRead: boolean;
  isChecked: boolean;
  isSameOwner: boolean;
}

interface State {
  items: MessageItem[];
}

const initialState: State = {
  items: [],
}

export const messagesReducer = (state: State = initialState, action: any): State => {
  switch (action.type) {
    case PUT_MESSAGES:
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
}
