import {call, put, takeEvery} from 'redux-saga/effects';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

import {LOAD_CONTACTS} from './types';
import {putContacts} from './actions';
import {IContact} from "../../components/contacts/Contacts";
import {getAccessToken} from "../../util/local-storage.util";

export function* watchLoadContacts() {
  yield takeEvery(LOAD_CONTACTS, workerLoadContacts);
}

function* workerLoadContacts() {
  const data: IContact[] = yield call(fetchContacts);
  yield put(putContacts(data));
}

function fetchContacts() {
  const config: AxiosRequestConfig = {
    headers: {'Authorization': `Bearer ${getAccessToken()}`}
  };

  return axios.get('/users/contacts', config)
    .then((res: AxiosResponse<IContact[]>) => res.data);
}
