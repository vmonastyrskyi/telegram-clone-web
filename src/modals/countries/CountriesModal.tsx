import React, {useState} from 'react';

import './CountriesModal.css';
import {RootState} from '../../redux/rootReducer';
import {SearchInput} from '../../components/input/search-input/SearchInput';
import {CountryList} from '../../components/list/country-list/CountryList';
import {useSelector} from 'react-redux';

interface Props {
  closeModal(): void;
}

export const CountriesModal: React.FC<Props> = (props) => {
  let countryItems = useSelector((state: RootState) => state.countries.items);

  const [countries, setCountries] = useState(countryItems);

  const searchCountry = (value: string) => {
    setCountries(countryItems.filter(country => country.name.toLowerCase().includes(value.toLowerCase())));
  }

  return (
    <>
      <div className="modal-backdrop" onClick={props.closeModal}/>
      <div id="countries" className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <span className="title">Country</span>
            <button className="close-btn" onClick={props.closeModal}>Close</button>
          </div>
          <div className="modal-body">
            <SearchInput onInput={searchCountry} focus={true}/>
            <CountryList countries={countries} closeModal={props.closeModal}/>
          </div>
        </div>
      </div>
    </>
  );
}
