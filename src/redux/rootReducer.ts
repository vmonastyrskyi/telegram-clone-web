import {combineReducers} from 'redux';

import {dialogsReducer} from "./dialogs/reducers";
import {messagesReducer} from "./messages/reducers";
import {contactsReducer} from "./contacts/reducers";

export const rootReducer = combineReducers({
  dialogs: dialogsReducer,
  messages: messagesReducer,
  contacts: contactsReducer
})

export type RootState = ReturnType<typeof rootReducer>
