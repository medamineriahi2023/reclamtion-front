import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {exhaustMap, map, switchMap} from 'rxjs';
import * as GroupActions from '../actions/group.actions'
import {UserService} from "../../core/user/user.service";

@Injectable()
export class GroupEffects {

  constructor(
    private actions: Actions,
    private userService: UserService,
  ) {}


    fetchGroups = createEffect(() =>
        this.actions.pipe(
            ofType(GroupActions.fetchGroups),
            switchMap(() =>
                this.userService.getAllGroups().pipe(
                  map((groups) => GroupActions.getGroups({groups})),
                )
            )
        )
    )


    addGroup$ = createEffect(() =>
    this.actions.pipe(
        ofType(GroupActions.addGroup),
        exhaustMap((action) =>
            this.userService.saveGroup(action.group).pipe(
              map(() => GroupActions.fetchGroups()),
            )
        )
    )
)

    updateGroup$ = createEffect(() =>
        this.actions.pipe(
            ofType(GroupActions.updateGroup),
            exhaustMap((action) =>
                this.userService.updateGroup(action.group).pipe(
                    map(() => GroupActions.fetchGroups())
                )
            )
        )
    );

    deleteGroup$ = createEffect(() =>
        this.actions.pipe(
            ofType(GroupActions.deleteGroup),
            exhaustMap((action) =>
                this.userService.deleteGroup(action.groupId).pipe(
                    map(() => GroupActions.fetchGroups())
                )
            )
        )
    );

    assignRolesToGroup = createEffect(() =>
        this.actions.pipe(
            ofType(GroupActions.assignRolesToGroup),
            exhaustMap((action) =>
                this.userService.assignRolesToGroup(action.groupId, action.rolesIds).pipe(
                    map(() => GroupActions.fetchGroups())
                )
            )
        )
    );

    assignUsersToGroup = createEffect(() =>
        this.actions.pipe(
            ofType(GroupActions.assignUsersToGroup),
            exhaustMap((action) =>
                this.userService.assignUsersToGroup(action.groupId, action.usersIds).pipe(
                    map(() => GroupActions.fetchGroups())
                )
            )
        )
    );





}
