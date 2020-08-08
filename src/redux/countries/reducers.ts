import {PUT_SELECTED_COUNTRY} from './types';

export interface CountryItem {
  id: number;
  name: string;
  code: string;
}

interface State {
  items: CountryItem[];
  selectedCountry: CountryItem | undefined;
}

const initialState: State = {
  items: [
    {id: 1, name: 'Russia', code: '+7'},
    {id: 2, name: 'Ukraine', code: '+380'}
  ],
  selectedCountry: undefined
}

export const countriesReducer = (state: State = initialState, action: any): State => {
  switch (action.type) {
    case PUT_SELECTED_COUNTRY:
      return {
        ...state,
        selectedCountry: action.payload
      };
    default:
      return state;
  }
}
