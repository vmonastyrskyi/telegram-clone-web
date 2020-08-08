import React from 'react';

import './ContactListItem.css';
import {IContact} from '../../../view/contacts/Contacts';
import {RoundImage} from '../../../common/round-image/RoundImage';

interface Props {
  contact: IContact;
}

export const ContactListItem: React.FC<Props> = (props) => {
  const contact = props.contact;

  let contactAvatar: string | undefined = contact.avatar;
  let contactName: string = (contact.firstName + ' ' + (contact.lastName ? contact.lastName : '')).trim();
  contact.onlineStatus = 'online';

  return (
    <li className="contact-item">
      <RoundImage avatar={contactAvatar}
                  title={contactName}
                  width={42}
                  height={42}
                  fontSize={14}/>
      <div className="information">
        <div className="contact-peer">
          <span>{contactName}</span>
        </div>
        <div className="contact-online-status">
          <span>{contact.onlineStatus}</span>
        </div>
      </div>
    </li>
  );
}
