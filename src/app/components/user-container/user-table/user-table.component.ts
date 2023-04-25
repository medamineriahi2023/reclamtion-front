import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../../models/user";
import {MatPaginator} from "@angular/material/paginator";
import {Group} from "../../../models/Group";
import {MatDialog} from "@angular/material/dialog";
import * as UserActions from "../../../store/actions/user.actions";
import {Store} from "@ngrx/store";
import * as fromUser from "../../../store/reducers/user.reducers";
import {UserService} from "../../../core/user/user.service";
import {ConfirmActionDialogData} from "../../modals/models";
import {ConfirmActionDialogComponent} from "../../../shared/dialog/confirm-action-dialog/confirm-action-dialog.component";
import {deleteUser} from "../../../store/actions/user.actions";
import {AddUserComponent} from "../../modals/add-user/add-user.component";
import {EditUserGroupsComponent} from "../../modals/edit-user-groups/edit-user-groups.component";
import {AddEditUserRolesComponent} from "../../modals/add-edit-user-roles/add-edit-user-roles.component";
import * as RoleActions from "../../../store/actions/role.actions";
import * as fromRole from "../../../store/reducers/role.reducers";
import {Role} from "../../../models/Role";
import * as GroupActions from "../../../store/actions/group.actions";
import * as fromGroup from "../../../store/reducers/group.reducers";
import {ResetPasswordComponent} from "../../modals/reset-password/reset-password.component";
export declare enum DialogAction {
    CONFIRM = 0,
    CANCEL = 1
}
export interface DialogResult {
    dialogAction: DialogAction;
    dialogData?: any;
}
@Component({
  selector: 'user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit, OnChanges, AfterViewInit {
    displayedColumns: string[] = ['FIRST NAME','LAST NAME', 'USER NAME', 'EMAIL', 'STATUS', 'GROUP', 'ROLES', 'ACTIONS'];
    dataSource: MatTableDataSource<User>;
    userState = this.store.select(fromUser.selectUserState)
    roleState = this.store.select(fromRole.selectRoleState)
    groupState = this.store.select(fromGroup.selectGroupState)

    @Input() filterValue = '';
    @Input() filterPredicate: (data: User, filter: string) => boolean;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    users: User[] = [];
    groups: Group[];
    roles: Role[];
    groupList: Group[];

    constructor(private _cdRef: ChangeDetectorRef,
                private _matDialog: MatDialog,
                private store: Store<fromUser.UserState>,
                private userService:UserService
                // private _translatorService: TranslatorService,
                // private _securityUserSandbox: SecurityUserSandbox,
                // public _securityGroupSandbox: GroupSandbox
    ) {

        this.dataSource = new MatTableDataSource();

    }

    ngOnInit(): void {
        this.filterChange();
        this.listenForDataChnages();
    }

    filterChange() {
        if (this.dataSource) {
            this.dataSource.filter = this.filterValue;
        }
    }

    listenForDataChnages() {
        this.store.dispatch(UserActions.fetchUsers())
        this.userState.subscribe(state => {
            this.dataSource.data = state.users
        })
        this.store.dispatch(RoleActions.fetchRoles())
        this.roleState.subscribe(state => {
            this.roles = state.roles
        });
        this.store.dispatch(GroupActions.fetchGroups())
        this.groupState.subscribe(state => {
            this.groupList = state.groups
        });
        if (this.dataSource.paginator) {
                            this.dataSource.paginator.firstPage();
                        }

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.filterValue) {
            this.filterChange();
        }
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    openConfirmActionDialog(confirmActionDialogData: ConfirmActionDialogData) {
        return this._matDialog.open(ConfirmActionDialogComponent, {
            panelClass: 'confirm-action-dialog',
            data: confirmActionDialogData
        });
    }

    delete(user: User) {
        const confirmActionDialogData: ConfirmActionDialogData = {
            message: "You really want to delete "+ user.userName +" ?",
            errorMessage: "be carefull this user is active !"
        };
        this.openConfirmActionDialog(confirmActionDialogData).afterClosed().subscribe((res: any[]) => {
            if (res) {
                this.store.dispatch(deleteUser({ username: user.userName }));
            }
        });
    }

    edit_user(user: User) {
        this._matDialog.open(AddUserComponent, {
            data: {
                fix: user,
            }
        });
    }

    edit_user_groups(user: User) {
        this._matDialog.open(EditUserGroupsComponent, {
                data: {
                    fix: user,
                    groups: this.groups,
                    groupList : this.groupList
                }
            }
        );
    }

    edit_user_roles(user: User) {
        this._matDialog.open(AddEditUserRolesComponent, {
                data: {
                    fix: user,
                    roles: this.roles
                }
            }
        );
    }

    resetPassword(user: User){
        this._matDialog.open(ResetPasswordComponent, {
                data: user.id
            }
        );
    }
}
