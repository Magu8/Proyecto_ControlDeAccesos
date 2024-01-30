import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { activeUserReducer } from './activeUser.reducer';

export interface State {
}

export const reducers: ActionReducerMap<State> = {
  activeUser: activeUserReducer, 
 
}; 

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
