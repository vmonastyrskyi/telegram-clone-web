import React, {useEffect} from 'react';

import './Authenticated.css';
import {Navbar} from "../../components/navbar/Navbar";
import {Main} from "../../components/main/Main";
import {useDispatch} from "react-redux";
import {loadDialogs} from "../../redux/dialogs/actions";
import {loadContacts} from "../../redux/contacts/actions";

interface Props {
}

export const Authenticated: React.FC<Props> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadDialogs());
  })

  useEffect(() => {
    dispatch(loadContacts());
  })

  return (
    <div className="authenticated_container">
      <div className="left_sector"/>
      <div className="middle_sector">
        <Navbar/>
        <Main/>
      </div>
      <div className="right_sector"/>
    </div>
  );
}
