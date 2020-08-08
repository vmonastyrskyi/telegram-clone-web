import React from 'react';

import './Contacts.css';
import {ContactList} from "../../list/contact-list/ContactList";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/rootReducer";

interface Props {
}

export interface IContact {
  id: string;
  firstName: string;
  lastName?: string;
  phone: string;
  avatar: string | undefined;
  onlineStatus: string;
}

export const Contacts: React.FC<Props> = () => {
  const contacts = useSelector((state: RootState) => state.contacts.items);

  return (
    <div className="contacts-container">
      <ContactList contacts={contacts}/>
    </div>
  );
}
