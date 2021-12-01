import { act } from '@ngrx/effects';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { AuthAction } from '../action-types';
import { User } from '../model/user.model';

export interface AuthState {
  user : User
}


export const initialAuthState : AuthState = {
  user : undefined
}

// export const reducers: ActionReducerMap<AuthState> = {

// };


export const authReducer = createReducer(
  initialAuthState,
  on(AuthAction.login,(state,action)=>{
    return {
      user : action.user
    }
  }),


  on(AuthAction.logout,(state,action)=>{
    return {
      user:undefined
    }
  })
)


// export const metaReducers: MetaReducer<AuthState>[] = !environment.production ? [] : [];
