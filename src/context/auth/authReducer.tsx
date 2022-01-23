import {User} from '../../interfaces/User.interface';
import {CountryCode, Country} from '../../utils/countryTypes';

export interface AuthState {
  status: 'checking' | 'authenticated' | 'not-authenticated';
  utility: 'choose' |'shop' | 'money';
  user: User | null;
  errorMessage: string;
  wait: boolean;
  sendPrice: number;
  countryCode: CountryCode;
  countryCallCode: string;
  mn: number;
  mlc: number;
}

type AuthAction =
  | {type: 'notAuthenticated'}
  | {type: 'utilityShop'}
  | {type: 'utilityMoney'}
  | {type: 'utilityChoose'}
  | {type: 'signUp'; payload: {user: User}}
  | {type: 'addError'; payload: string}
  | {type: 'setPrice'; payload: number}
  | {type: 'setCountryCode'; payload: CountryCode}
  | {type: 'setCountryCallCode'; payload: string}
  | {type: 'removeError'}
  | {type: 'deleteCode'; payload: {user: User}}
  | {type: 'setCode'; payload: {user: User}}
  | {type: 'logout'}
  | {type: 'initCheck'}
  | {type: 'loginB'}
  | {type: 'setMN'; payload: number}
  | {type: 'setMLC'; payload: number};

export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
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
    case 'setPrice':
      return {
        ...state,
        sendPrice: action.payload,
        };
    case 'setMN':
        return {
        ...state,
        mn: action.payload,
       };
    case 'setMLC':
        return {
        ...state,
        mlc: action.payload,
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

    default:
      return state;
  }
};
