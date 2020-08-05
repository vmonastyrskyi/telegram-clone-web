import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {useSelector} from 'react-redux';

import './Navbar.css';
import {CreateGroupModal} from '../../modals/create-dialog/CreateGroupModal';
import {ContactsModal} from '../../modals/contacts/ContactsModal';
import {RootState} from '../../redux/rootReducer';

const modalContainer = document.getElementById('modal')!;

interface Props {
}

export const Navbar: React.FC<Props> = () => {
  const selectedDialog = useSelector((state: RootState) => state.dialogs.selectedDialog);

  const [isOptionsOpened, setIsOptionsOpened] = useState(false);
  const [isCreateGroupModalOpened, setIsCreateGroupModalOpened] = useState(false);
  const [isContactsModalOpened, setIsContactsModalOpened] = useState(false);

  let dialogName: string | undefined;
  if (selectedDialog) {
    if (selectedDialog.type === 'dialog') {
      const dialogUser = selectedDialog.users[0];
      dialogName = (dialogUser.firstName + ' ' + (dialogUser.lastName ? dialogUser.lastName : '')).trim();
    }
  }

  useEffect(() => {
    const closeOptions = () => {
      if (isOptionsOpened) {
        setIsOptionsOpened(false);
      }
    }
    document.addEventListener('click', closeOptions, false);
    return () => {
      document.removeEventListener('click', closeOptions, false);
    }
  }, [isOptionsOpened]);

  const openCreateGroupModal = () => {
    setIsCreateGroupModalOpened(true);
    setIsOptionsOpened(false);
  }

  const closeCreateGroupModal = () => {
    setIsCreateGroupModalOpened(false);
  }

  const openContactsModal = () => {
    setIsContactsModalOpened(true);
    setIsOptionsOpened(false);
  }

  const closeContactsModal = () => {
    setIsContactsModalOpened(false);
  }

  const openCloseOptions = () => {
    setIsOptionsOpened(!isOptionsOpened);
  }

  return (
    <>
      <div className="navbar">
        <div className={"navbar__header " + (isOptionsOpened ? "open" : "")} onClick={openCloseOptions}>
          <div className="hamburger">
            <span/>
            <span/>
            <span/>
          </div>
          <span className="title">Telegram</span>

          <ul className="options" style={{display: (isOptionsOpened ? "block" : "none")}}>
            <li onClick={openCreateGroupModal}><span className="material-icons">group</span>New group</li>
            <li onClick={openContactsModal}><span className="material-icons">account_box</span>Contacts</li>
            <li><span className="material-icons">settings</span>Settings</li>
            <li><span className="material-icons">help</span>Telegram FAQ</li>
            <li><span className="material-icons">info</span>About</li>
          </ul>
        </div>

        {selectedDialog &&
        <>
          <div className="navbar__information">
            <div className="user-info">
              <span className="user-name">{dialogName}</span>
              <span className="user-status">online</span>
            </div>

            <div className="option-name">

            </div>
          </div>

          <div className="navbar__option-buttons">
            <button className="search-btn">
              <span className="material-icons">search</span>
            </button>
            <button className="options-btn">
              <span className="material-icons">more_vert</span>
            </button>
          </div>
        </>
        }
      </div>

      {isCreateGroupModalOpened
      && ReactDOM.createPortal(<CreateGroupModal closeModal={closeCreateGroupModal}/>, modalContainer)}
      {isContactsModalOpened
      && ReactDOM.createPortal(<ContactsModal closeModal={closeContactsModal}/>, modalContainer)}
    </>
  );
}
