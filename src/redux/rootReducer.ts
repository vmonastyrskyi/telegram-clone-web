import {combineReducers} from 'redux';

import {appReducer} from './app/reducers';
import {dialogsReducer} from './dialogs/reducers';
import {messagesReducer} from './messages/reducers';
import {contactsReducer} from './contacts/reducers';

export const rootReducer = combineReducers({
  app: appReducer,
  dialogs: dialogsReducer,
  messages: messagesReducer,
  contacts: contactsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
