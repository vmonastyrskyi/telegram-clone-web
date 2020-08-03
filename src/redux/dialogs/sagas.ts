import {call, put, takeEvery} from 'redux-saga/effects';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

import {LOAD_DIALOGS} from './types';
import {putDialogs} from './actions';
import {getAccessToken} from '../../util/local-storage.util';
import {DialogItem} from "./reducers";

export interface Dialog {
  id: string;
  type: string;
  name: string;
  users: {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
    phone: string;
  }[];
  messages: {
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
  }[];
}

export function* watchLoadDialogs() {
  yield takeEvery(LOAD_DIALOGS, workerLoadDialogs);
}

function* workerLoadDialogs() {
  const data = yield call(fetchDialogs);
  yield put(putDialogs(data));
}

function fetchDialogs() {
  const config: AxiosRequestConfig = {
    headers: {'Authorization': `Bearer ${getAccessToken()}`}
  };

  return axios.get('/dialogs', config)
    .then((res: AxiosResponse) => {
      const dialogs: DialogItem[] = [];

      (res.data as Dialog[]).forEach(dialog => {
        dialog.messages = dialog.messages.splice(0, dialog.messages.length - 1);
        dialogs.push({
          ...dialog,
          isSelected: false
        });
      });

      return dialogs;
    });
}
