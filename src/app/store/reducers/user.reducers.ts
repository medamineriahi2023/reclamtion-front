import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import {getUser, getUsers} from '../actions/user.actions';
import {User} from "../../models/user";

export interface UserState {
  users: User[];
  currentUser: User;
}

export const initialState: UserState = {
    users: [],
    currentUser: null
};

const _userReducer = createReducer(
  initialState,
  on(getUsers, (state, { users }) => {
    return  {
      ...state,
      users: users,
    }
  }),
  on(getUser, (state, { user }) => {
    return  {
      ...state,
      currentUser: user,
    }
  })
)

export function userReducer(state, action) {
  return _userReducer(state, action)
}

export const selectUserState = createFeatureSelector<UserState>('user')
export const selectUsers = createSelector(selectUserState, state => state.users)


