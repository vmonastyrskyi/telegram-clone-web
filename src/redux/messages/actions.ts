import {BEGIN_CHECK_MESSAGES, CREATE_MESSAGE, END_CHECK_MESSAGES} from "./types";
import {IMessage} from "../../components/messages/Messages";

export const createMessage = (message: IMessage) => {
  return {type: CREATE_MESSAGE, payload: message};
}

export const beginCheckItems = () => {
  return {type: BEGIN_CHECK_MESSAGES};
}

export const endCheckItems = () => {
  return {type: END_CHECK_MESSAGES};
}
