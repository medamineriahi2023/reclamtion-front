import {createAction, props} from "@ngrx/store";
import {Role} from "../../models/Role";

export const getPermissions = createAction(
    '[Role] Get Permissions',
    props<{ roles: Role[] }>()
)



export const fetchPermissions = createAction(
    '[Role] Fetch Permissions'
)


