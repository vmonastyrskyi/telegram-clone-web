import React from 'react';

import './ContactListItem.css';
import {IContact} from "../Contacts";
import {RoundImage} from "../../round-image/RoundImage";

interface Props {
  contact: IContact;
}

export const ContactListItem: React.FC<Props> = (props) => {
  let title: string;
  if (props.contact.lastName && props.contact.lastName !== '') {
    title = props.contact.firstName + ' ' + props.contact.lastName;
  } else {
    title = props.contact.firstName;
  }
  props.contact.onlineStatus = 'online';

  return (
    <li className="contact-item">
      <RoundImage image={props.contact.avatar}
                  title={title}
                  width={42}
                  height={42}
                  fontSize={14}/>
      <div className="information">
        <div className="contact-peer">
          <span>{props.contact.firstName + " " + props.contact.lastName}</span>
        </div>
        <div className="contact-online-status">
          <span>{props.contact.onlineStatus}</span>
        </div>
      </div>
    </li>
  );
}
