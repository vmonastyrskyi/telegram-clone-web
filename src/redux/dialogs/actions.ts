import {IDialog} from "../../components/dialogs/Dialogs";
import {LOAD_DIALOGS, PUT_DIALOGS} from "./types";

export const loadDialogs = () => {
  return {type: LOAD_DIALOGS};
}

export const putDialogs = (dialogs: IDialog[]) => {
  return {type: PUT_DIALOGS, payload: dialogs};
}
