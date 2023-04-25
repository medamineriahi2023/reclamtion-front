import {createAction, props} from "@ngrx/store";
import {Role} from "../../models/Role";

export const fetchRoles = createAction(
  '[Role] Fetch Roles'
)

export const getRoles = createAction(
  '[Role] Get Roles',
  props<{ roles: Role[] }>()
)

export const getRole = createAction(
  '[Role] Get Roles',
  props<{ role: Role }>()
)

export const addRole = createAction(
  '[Role] Add Roles',
  props<{ role: Role }>()
)

export const updateRole = createAction(
    '[Role] Update ROle',
    props<{ role: Role }>()
)

export const deleteRole = createAction(
    '[Role] Delete Role',
    props<{ roleName: string }>()
)

export const assignCompositeRolesForRole = createAction(
    '[Role] Assign composite to Role',
    props<{ roleId: string, rolesIds: string[] }>()
);
