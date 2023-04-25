import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {exhaustMap, map, switchMap} from 'rxjs';
import * as UserActions from '../actions/user.actions'
import {UserService} from "../../core/user/user.service";

@Injectable()
export class UserEffects {

  constructor(
    private actions: Actions,
    private userService: UserService,
  ) {}


    fetchUsers$ = createEffect(() =>
        this.actions.pipe(
            ofType(UserActions.fetchUsers),
            switchMap(() =>
                this.userService.getAll().pipe(
                  map((users) => UserActions.getUsers({users})),
                )
            )
        )
    )

    addUser$ = createEffect(() =>
    this.actions.pipe(
        ofType(UserActions.addUser),
        exhaustMap((action) =>
            this.userService.save(action.user).pipe(
              map(() => UserActions.fetchUsers()),
            )
        )
    )
)

    deleteUser$ = createEffect(() =>
        this.actions.pipe(
            ofType(UserActions.deleteUser),
            exhaustMap((action) =>
                this.userService.delete(action.username).pipe(
                    map(() => UserActions.fetchUsers())
                )
            )
        )
    );

    updateUser$ = createEffect(() =>
        this.actions.pipe(
            ofType(UserActions.updateUser),
            exhaustMap((action) =>
                this.userService.updateUser(action.user).pipe(
                    map(() => UserActions.fetchUsers())
                )
            )
        )
    );

    assignUserToGroups = createEffect(() =>
        this.actions.pipe(
            ofType(UserActions.assignUserToGroups),
            exhaustMap((action) =>
                this.userService.assignUserToGroups(action.userId, action.groupIds).pipe(
                    map(() => UserActions.fetchUsers())
                )
            )
        )
    );

    assignRolesToUser = createEffect(() =>
        this.actions.pipe(
            ofType(UserActions.assignRolesToUser),
            exhaustMap((action) =>
                this.userService.assignRolesToUser(action.userId, action.rolesId).pipe(
                    map(() => UserActions.fetchUsers())
                )
            )
        )
    );

    resetPassword = createEffect(() =>
        this.actions.pipe(
            ofType(UserActions.resetPassword),
            exhaustMap((action) =>
                this.userService.resetPassword(action.userId, action.newPassword).pipe(
                    map(() => UserActions.fetchUsers())
                )
            )
        )
    );


}
