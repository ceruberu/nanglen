// Sample reducer, showing how you can 'listen' to the `INCREMENT_COUNTER`
// action, and update the counter state

// Note: There's no need to specify default state, because the kit's Redux
// init code wraps `undefined` state values in a `defaultReducer()` function,
// that captures Redux sentinel vals and responds back with a black object --
// so in our reducer functions, we can safely assume we're working with 'real'
// immutable state

import {
  USER_SIGN_IN,
//   USER_SIGN_OUT,
//   USER_SIGN_UP,
} from '../actions/actionTypes';

export default function reducer(state, action) {
  if (action.type === USER_SIGN_IN) {
    // Where did `state.merge()` come from?  Our plain state object is automatically
    // wrapped in a call to `seamless-immutable` in our reducer init code,
    // so we can use its functions to return a guaranteed immutable version
    return state.merge({
      userId: action.userId,
    });
  }
  return state;
}
