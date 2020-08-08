import {LOAD_CONTACTS, PUT_CONTACTS} from './types';
import {IContact} from '../../components/view/contacts/Contacts';

export const loadContacts = () => {
  return {type: LOAD_CONTACTS};
}

export const putContacts = (contacts: IContact[]) => {
  return {type: PUT_CONTACTS, payload: contacts};
}
