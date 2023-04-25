import {UserState,userReducer} from "./reducers/user.reducers";
import {GroupState,groupReducer} from "./reducers/group.reducers";
import {roleReducer, RoleState} from "./reducers/role.reducers";
import {permissionReducer, PermissionState} from "./reducers/permission.reducers";

export interface AppState {
  userState: UserState;
  groupSate: GroupState;
  roleState: RoleState;
  permissionState: PermissionState;
}

export const reducers = {
    user: userReducer,
    group: groupReducer,
    role:roleReducer,
    permissions: permissionReducer,

};
