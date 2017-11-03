import { USER_SIGN_UP, USER_SIGN_IN, USER_SIGN_OUT } from './actionTypes';

export function userSignIn(user) {
  return {
    type: USER_SIGN_IN,
    userId: user.userId,
  };
}

export function userSignUp(user) {
  return {
    type: USER_SIGN_UP,
    userId: user.userId,
  };
}
