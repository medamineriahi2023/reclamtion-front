import {createAction, props} from "@ngrx/store";
import {User} from "../../models/user";

export const fetchUsers = createAction(
  '[User] Fetch Users'
)

export const getUsers = createAction(
  '[User] Get Users',
  props<{ users: User[] }>()
)

export const getUser = createAction(
  '[User] Get User',
  props<{ user: User }>()
)

export const addUser = createAction(
  '[User] Add User',
  props<{ user: User }>()
)

export const deleteUser = createAction(
    '[User] Delete User',
    props<{ username: string }>()
)

export const updateUser = createAction(
    '[User] Update User',
    props<{ user: User }>()
)

export const assignUserToGroups = createAction(
    '[User] Assign User to Groups',
    props<{ userId: string, groupIds: string[] }>()
);

export const assignRolesToUser = createAction(
    '[User] Assign Roles to User',
    props<{ userId: string, rolesId: string[] }>()
);

export const resetPassword = createAction(
    '[User] ResetPassword to User',
    props<{ userId: string , newPassword: string}>()
);



