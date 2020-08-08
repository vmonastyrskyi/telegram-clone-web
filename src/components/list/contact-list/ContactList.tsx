import React from 'react';

import './ContactList.css';
import {ContactListItem} from './contact-list-item/ContactListItem';
import {IContact} from '../../view/contacts/Contacts';

interface Props {
  contacts: IContact[];
}

export const ContactList: React.FC<Props> = (props) => {
  return (
    <ul className="contacts">
      {props.contacts && props.contacts.map(contact => <ContactListItem key={contact.id} contact={contact}/>)}
    </ul>
  );
}
