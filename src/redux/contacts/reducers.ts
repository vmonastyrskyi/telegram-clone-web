import {IContact} from "../../components/contacts/Contacts";
import {PUT_CONTACTS} from "./types";

interface State {
  items: IContact[]
}

const initialState: State = {
  items: []
}

export const contactsReducer = (state: State = initialState, action: any): State => {
  switch (action.type) {
    case PUT_CONTACTS:
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
}
