import {call, put, takeEvery} from 'redux-saga/effects';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

import {LOAD_MESSAGES} from './types';
import {putMessages} from './actions';
import {getAccessToken} from '../../util/local-storage.util';
import {MessageItem} from "./reducers";

export interface Message {
  id: string;
  text: string;
  type: string;
  isUpdated: boolean;
  createdDate: string;
  updatedDate: string;
  owner: {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
    phone: string;
  }
}

export function* watchLoadMessages() {
  yield takeEvery(LOAD_MESSAGES, workerLoadMessages);
}

function* workerLoadMessages(action: { type: string, payload: string }) {
  const data = yield call(fetchMessages, action.payload);
  yield put(putMessages(data));
}

function fetchMessages(dialogId: string) {
  const config: AxiosRequestConfig = {
    headers: {'Authorization': `Bearer ${getAccessToken()}`}
  };

  return axios.get(`/dialogs/${dialogId}/messages`, config)
    .then((res: AxiosResponse) => {
      const messages: MessageItem[] = [];

      (res.data as Message[]).forEach(message => {
        console.log(message)
        messages.push({
          ...message,
          isRead: false,
          isChecked: false,
          isSameOwner: false,
        });
      });
      console.log(messages)

      return messages;
    });
}
