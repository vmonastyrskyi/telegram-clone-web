import React, {useState} from 'react';
import './App.css';
import {Authentication} from "./pages/auth/Authentication";

interface Props {
}

export const App: React.FC<Props> = () => {
  const [isAuthenticated] = useState(false);

  return (
    <div className="app_container">
      {isAuthenticated ?
        <></> :
        <Authentication/>
      }
    </div>
  );
}
