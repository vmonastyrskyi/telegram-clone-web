import React from 'react';

import './CountryList.css';
import {CountryItem} from "../../../redux/countries/reducers";
import {CountryListItem} from './country-list-item/CountryListItem';

interface Props {
  countries: CountryItem[];

  closeModal(): void;
}

export const CountryList: React.FC<Props> = (props) => {
  return (
    <ul className="countries">
      {props.countries.map(country => <CountryListItem key={country.id} country={country} closeModal={props.closeModal}/>)}
    </ul>
  );
}
