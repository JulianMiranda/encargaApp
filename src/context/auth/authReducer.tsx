import {Prices} from '../../interfaces/Prices.interface';
import {User} from '../../interfaces/User.interface';
import {CountryCode} from '../../utils/countryTypes';

export interface AuthState {
  status:
    | 'checking'
    | 'authenticated'
    | 'not-authenticated'
    | 'not-internet'
    | 'invited';
  utility: 'choose' | 'shop' | 'money';
  user: User | null;
  errorMessage: string;
  wait: boolean;
  countryCode: CountryCode;
  countryCallCode: string;
  prices: Prices;
}

type AuthAction =
  | {type: 'notAuthenticated'}
  | {type: 'invited'}
  | {type: 'notInternet'}
  | {type: 'utilityShop'}
  | {type: 'utilityMoney'}
  | {type: 'utilityChoose'}
  | {type: 'signUp'; payload: {user: User}}
  | {type: 'addError'; payload: string}
  | {type: 'setCountryCode'; payload: CountryCode}
  | {type: 'setCountryCallCode'; payload: string}
  | {type: 'removeError'}
  | {type: 'deleteCode'; payload: {user: User}}
  | {type: 'setCode'; payload: {user: User}}
  | {type: 'logout'}
  | {type: 'initCheck'}
  | {type: 'loginB'}
  | {type: 'setPrices'; payload: Prices}
  | {type: 'updateReciveNotifications'; payload: User};

export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'notInternet':
      return {
        ...state,
        status: 'not-internet',
        wait: false,
      };
    case 'invited':
      return {
        ...state,
        user: null,
        wait: false,
        status: 'invited',
      };
    case 'loginB':
      return {
        ...state,
        status: 'authenticated',
      };
    case 'utilityShop':
      return {
        ...state,
        utility: 'shop',
      };
    case 'utilityMoney':
      return {
        ...state,
        utility: 'money',
      };
    case 'utilityChoose':
      return {
        ...state,
        utility: 'choose',
      };

    case 'setPrices':
      return {
        ...state,
        prices: action.payload,
      };
    case 'setCountryCode':
      return {
        ...state,
        countryCode: action.payload,
      };
    case 'setCountryCallCode':
      return {
        ...state,
        countryCallCode: action.payload,
      };
    case 'deleteCode':
      return {
        ...state,
        user: action.payload.user,
      };
    case 'setCode':
      return {
        ...state,
        user: action.payload.user,
      };
    case 'logout':
    case 'notAuthenticated':
      return {
        ...state,
        status: 'not-authenticated',
        user: null,
        wait: false,
      };

    case 'addError':
      return {
        ...state,
        user: null,
        status: 'not-authenticated',
        errorMessage: action.payload,
        wait: false,
      };

    case 'removeError':
      return {
        ...state,
        errorMessage: '',
        wait: false,
      };
    case 'initCheck':
      return {
        ...state,
        wait: true,
      };

    case 'signUp':
      return {
        ...state,
        errorMessage: '',
        status: 'authenticated',
        user: action.payload.user,
        wait: false,
      };
    case 'updateReciveNotifications':
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
