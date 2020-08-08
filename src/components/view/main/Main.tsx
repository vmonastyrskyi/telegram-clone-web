import React from 'react';

import './Main.css';
import {Dialogs} from '../dialogs/Dialogs';
import {Messages} from '../messages/Messages';

interface Props {
}

export const Main: React.FC<Props> = () => {
  return (
    <div className="main-container">
      <Dialogs/>
      <Messages/>
    </div>
  );
}
