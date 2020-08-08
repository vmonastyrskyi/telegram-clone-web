import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import io from 'socket.io-client';

import './Authenticated.css';
import {Navbar} from '../../components/view/navbar/Navbar';
import {Main} from '../../components/view/main/Main';
import {loadDialogs} from '../../redux/dialogs/actions';
import {loadContacts} from '../../redux/contacts/actions';
import {putClientSocket, removeClientSocket} from '../../redux/app/actions';
import {isTokenExpired} from '../../util/jwt.util';

interface Props {
}

export const Authenticated: React.FC<Props> = () => {
  const [isAuthenticated] = useState(!isTokenExpired());

  const dispatch = useDispatch();

  if (isAuthenticated) {
    dispatch(loadDialogs());
    dispatch(loadContacts());
  }

  const socketConnection = () => {
    const socket = io('ws://localhost:8080');
    socket.on('connect', () => {
      console.log('[WS] connected');
      dispatch(putClientSocket(socket));
    })
    socket.on('disconnect', () => {
      console.log('[WS] disconnected');
      dispatch(removeClientSocket());
    })
    return function disconnect() {
      console.log('[WS] disconnected');
      dispatch(removeClientSocket());
      socket.disconnect();
    }
  }
  useEffect(socketConnection, []);

  return (
    <div className="authenticated-container">
      <div className="left_sector"/>
      <div className="middle_sector">
        <Navbar/>
        <Main/>
      </div>
      <div className="right_sector"/>
    </div>
  );
}
