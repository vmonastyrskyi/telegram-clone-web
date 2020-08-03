import {LOAD_MESSAGES, PUT_MESSAGES} from './types';
import {MessageItem} from "./reducers";

export const loadMessages = (dialogId: string) => {
  return {type: LOAD_MESSAGES, payload: dialogId};
}

export const putMessages = (messages: MessageItem[]) => {
  return {type: PUT_MESSAGES, payload: messages};
}
