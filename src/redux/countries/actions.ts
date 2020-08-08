import {PUT_SELECTED_COUNTRY} from './types';
import {CountryItem} from './reducers';

export const putSelectedCountry = (country: CountryItem) => {
  return {type: PUT_SELECTED_COUNTRY, payload: country};
}
