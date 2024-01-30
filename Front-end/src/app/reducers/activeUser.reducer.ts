import { createReducer, on } from '@ngrx/store';
import {
  failActiveUser,
  logoutActiveUser,
  setActiveUser,
  updateActiveUser,
} from '../actions/activeUser.actions';

export const initialState = {};

export const activeUserReducer = createReducer(
  initialState,
  on(setActiveUser, () => {
    let token = localStorage.getItem('token');
    if (token) {
      let payload = token.split('.')[1];
      const decodedToken = JSON.parse(atob(payload));
      return decodedToken;
    }
    return initialState;
  }),
  on(failActiveUser, (state, { error }) => {
    return error;
  }),
  on(updateActiveUser, (state, { setActivo }) => {
    const updateUser = { ...state, activo: setActivo ? false : true };
    return updateUser;
  }),
  on(logoutActiveUser, () => {
    localStorage.clear();
    return initialState;
  })
);
