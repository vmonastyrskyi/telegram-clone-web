import React, {useEffect, useRef, useState} from 'react';

import './SearchInput.css';

interface Props {
  focus?: boolean;

  onInput?(value: string): void;
}

export const SearchInput: React.FC<Props> = (props) => {
  const [isTyping, setIsTyping] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.focus) {
      searchInputRef.current!.focus();
    }
  });

  const onSearchInput = () => {
    props.onInput!(searchInputRef.current!.value);
    if (searchInputRef.current!.value.length > 0) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  }

  const clearSearchInput = () => {
    props.onInput!('');
    searchInputRef.current!.value = '';
    setIsTyping(false);
  }

  return (
    <div className="search">
      <span className="material-icons search-icon" onClick={() => searchInputRef.current!.focus()}>search</span>
      <input ref={searchInputRef}
             onInput={onSearchInput}
             className="search-input"
             type="text"
             placeholder="Search"/>
      {isTyping && <span onClick={clearSearchInput} className="material-icons close-icon">clear</span>}
    </div>
  );
}
