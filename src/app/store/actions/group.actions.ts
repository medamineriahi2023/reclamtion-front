import {createAction, props} from "@ngrx/store";
import {Group} from "../../models/Group";

export const fetchGroups = createAction(
  '[Group] Fetch Groups'
)

export const getGroups = createAction(
  '[Group] Get Groups',
  props<{ groups: Group[] }>()
)

export const getGroup = createAction(
  '[Group] Get Group',
  props<{ group: Group }>()
)

export const addGroup = createAction(
  '[Group] Add Group',
  props<{ group: Group }>()
)

export const updateGroup = createAction(
    '[Group] Update Group',
    props<{ group: Group }>()
)

export const deleteGroup = createAction(
    '[Group] Delete Group',
    props<{ groupId: string }>()
)

export const assignRolesToGroup = createAction(
    '[Group] Assign Roles to Group',
    props<{ groupId: string, rolesIds: string[] }>()
);

export const assignUsersToGroup = createAction(
    '[Group] Assign Users to Group',
    props<{ groupId: string, usersIds: string[] }>()
);

