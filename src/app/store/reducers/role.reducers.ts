import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import {getRole, getRoles} from '../actions/role.actions';
import {Role} from "../../models/Role";

export interface RoleState {
  roles: Role[];
  currentRole: Role;
}

export const initialState: RoleState = {
    roles: [],
    currentRole: null
};

const _roleReducer = createReducer(
  initialState,
  on(getRoles, (state, { roles }) => {
    return  {
      ...state,
      roles: roles,
    }
  }),
  on(getRole, (state, { role }) => {
    return  {
      ...state,
      currentRole: role,
    }
  })
)

export function roleReducer(state, action) {
  return _roleReducer(state, action)
}

export const selectRoleState = createFeatureSelector<RoleState>('role')
export const selectRoles = createSelector(selectRoleState, state => state.roles)


