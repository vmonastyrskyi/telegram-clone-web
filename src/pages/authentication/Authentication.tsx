import React, {useState} from 'react';

import './Authentication.css';
import {SignIn} from "../../components/sign-in/SignIn";
import {SignUp} from "../../components/sign-up/SignUp";

interface Props {
}

export const Authentication: React.FC<Props> = () => {
  const [authenticationType] = useState('sign-in');

  const authenticationSwitcher = (authenticationType: string) => {
    switch (authenticationType) {
      case 'sign-in':
        return <SignIn/>;
      case 'sign-up':
        return <SignUp/>;
    }
  }

  return (
    <div className="authentication_container">
      {authenticationSwitcher(authenticationType)}
    </div>
  );
}
