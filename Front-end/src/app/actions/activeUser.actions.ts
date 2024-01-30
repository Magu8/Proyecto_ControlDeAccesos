import { createAction, props } from '@ngrx/store';
import { Login } from '../../model/login';

export const logActiveUser = createAction(
  '[Login Component] Login',
  props<{ login: Login }>()
);

export const failActiveUser = createAction(
  '[Worker Service] Login Failure',
  props<{ error: any }>()
);

export const setActiveUser = createAction('[Worker Service] Login Success');

export const updateActiveUser = createAction(
  '[ActiveUser] Update Active User',
  props<{ setActivo: boolean }>()
);
export const logoutActiveUser = createAction('[ActiveUser] Log Out');
