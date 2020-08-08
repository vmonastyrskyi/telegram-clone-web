import React from 'react';
import {useDispatch} from 'react-redux';

import './CountryListItem.css';
import {CountryItem} from '../../../../redux/countries/reducers';
import {putSelectedCountry} from '../../../../redux/countries/actions';

interface Props {
  country: CountryItem;
  closeModal(): void;
}

export const CountryListItem: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const country = props.country;

  const selectCountry = () => {
    dispatch(putSelectedCountry(country));
    props.closeModal();
  };

  return (
    <li className="country-item" onClick={selectCountry}>
      <span className="country-name">{country.name}</span>
      <span className="country-code">{country.code}</span>
    </li>
  );
}
