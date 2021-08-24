import {User} from '../../interfaces/User.interface';

export interface AuthState {
  status: 'checking' | 'authenticated' | 'not-authenticated';
  user: User | null;
  errorMessage: string;
  wait: boolean;
  sendPrice: number;
}

type AuthAction =
  | {type: 'notAuthenticated'}
  | {type: 'signUp'; payload: {user: User}}
  | {type: 'addError'; payload: string}
  | {type: 'setPrice'; payload: number}
  | {type: 'removeError'}
  | {type: 'logout'}
  | {type: 'initCheck'}
  | {type: 'loginB'};

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
    case 'setPrice':
      return {
        ...state,
        sendPrice: action.payload,
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
