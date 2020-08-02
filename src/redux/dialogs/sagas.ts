import {call, put, takeEvery} from 'redux-saga/effects';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

import {LOAD_DIALOGS} from './types';
import {putDialogs} from './actions';
import {getAccessToken} from '../../util/local-storage.util';
import {IDialog} from "../../components/dialogs/Dialogs";

interface Dialog {
  id: string;
  users: [{
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
    phone: string;
  }]
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
      const dialogs: IDialog[] = [];

      (res.data as Dialog[]).forEach(dialog => {
        const dialogUser = dialog.users[0];
        dialogs.push({
          id: dialog.id,
          title: dialogUser.firstName + ' ' + dialogUser.lastName,
          lastMessage: 'Hi',
          lastMessageOwner: dialogUser.firstName,
          lastMessageDate: 'Fri',
          avatar: dialogUser.avatar
        } as IDialog);
      });

      return dialogs;
    });
}
