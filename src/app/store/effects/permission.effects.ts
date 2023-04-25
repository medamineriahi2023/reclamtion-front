import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map, switchMap} from 'rxjs';
import * as PermissionAction from '../actions/permission.actions'
import {UserService} from "../../core/user/user.service";

@Injectable()
export class PermissionEffects {

  constructor(
    private actions: Actions,
    private userService: UserService,
  ) {}


    fetchPermissions$ = createEffect(() =>
        this.actions.pipe(
            ofType(PermissionAction.fetchPermissions),
            switchMap(() =>
                this.userService.getAllPermissions().pipe(
                    map((roles) => PermissionAction.getPermissions({roles})),
                )
            )
        )
    )


}
