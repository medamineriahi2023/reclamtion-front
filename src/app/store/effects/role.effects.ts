import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, EMPTY, exhaustMap, map, switchMap} from 'rxjs';
import * as RoleActions from '../actions/role.actions'
import {UserService} from "../../core/user/user.service";
import Swal from "sweetalert2";

@Injectable()
export class RoleEffects {

  constructor(
    private actions: Actions,
    private userService: UserService,
  ) {}


    fetchRoles = createEffect(() =>
        this.actions.pipe(
            ofType(RoleActions.fetchRoles),
            switchMap(() =>
                this.userService.getAllRoles().pipe(
                  map((roles) => RoleActions.getRoles({roles})),
                )
            )
        )
    )


    addRole$ = createEffect(() =>
        this.actions.pipe(
            ofType(RoleActions.addRole),
            exhaustMap((action) =>
                this.userService.saveRole(action.role).pipe(
                    map(() => RoleActions.fetchRoles()),
                )
            )
        )
    )

    updateRole$ = createEffect(() =>
        this.actions.pipe(
            ofType(RoleActions.updateRole),
            exhaustMap((action) =>
                this.userService.updateRole(action.role).pipe(
                    map(() => RoleActions.fetchRoles()),
                )
            )
        )
    )

    deleteRole$ = createEffect(() =>
        this.actions.pipe(
            ofType(RoleActions.deleteRole),
            exhaustMap((action) =>
                this.userService.deleteRole(action.roleName).pipe(
                    map(() => RoleActions.fetchRoles()),
                    catchError((error) => {
                        Swal.fire({
                            title: 'Error',
                            text: error.error,
                            icon: 'error'
                        });
                        return EMPTY;
                    })
                )
            )
        )
    );

    assignCompositeRolesForRole$ = createEffect(() =>
        this.actions.pipe(
            ofType(RoleActions.assignCompositeRolesForRole),
            exhaustMap((action) =>{
                return this.userService.assignCompositeRolesForRole(action.roleId, action.rolesIds).pipe(
                    map(() => RoleActions.fetchRoles())
                )}
            )
        )
    );



}
