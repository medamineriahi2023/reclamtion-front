import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import {getPermissions} from '../actions/permission.actions';
import {Role} from "../../models/Role";

export interface PermissionState {
  roles: Role[];
}

export const initialState: PermissionState = {
    roles: []
};

const _permissionReducer = createReducer(
  initialState,
  on(getPermissions, (state, { roles }) => {
    return  {
      ...state,
      roles: roles,
    }
  }),
)

export function permissionReducer(state, action) {
  return _permissionReducer(state, action)
}

export const selectPermissionState = createFeatureSelector<PermissionState>('permissions')
export const selectRoles = createSelector(selectPermissionState, state => state.roles)


