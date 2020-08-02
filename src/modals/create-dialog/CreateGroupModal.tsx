import React from 'react';

import './CreateGroupModal.css';
import {SearchInput} from "../../components/search/SearchInput";

interface Props {
  readonly closeModal: any
}

export const CreateGroupModal: React.FC<Props> = (props) => {
  return (
    <>
      <div className="modal-backdrop" onClick={props.closeModal}/>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <span className="modal__header_title">New group</span>
            <button className="modal__header_close-btn" onClick={props.closeModal}>Close</button>
          </div>
          <div className="modal-body">
            <SearchInput focus={true}/>
          </div>
          <div className="modal-footer">
            <button className="cancel-btn" onClick={props.closeModal}>Cancel</button>
            <button className="next-btn disabled">Next</button>
          </div>
        </div>
      </div>
    </>
  );
}
