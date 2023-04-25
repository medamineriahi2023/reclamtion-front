import {ChangeDetectorRef, Component, Input, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Group} from "../../../models/Group";
import {MatPaginator} from "@angular/material/paginator";
import {User} from "../../../models/user";
import {MatDialog} from "@angular/material/dialog";
import * as GroupActions from "../../../store/actions/group.actions";
import {Store} from "@ngrx/store";
import * as fromGroup from "../../../store/reducers/group.reducers";
import * as fromUser from "../../../store/reducers/user.reducers";
import {ConfirmActionDialogData} from "../../modals/models";
import {ConfirmActionDialogComponent} from "../../../shared/dialog/confirm-action-dialog/confirm-action-dialog.component";
import {AddEditGroupComponent} from "../../modals/add-edit-group/add-edit-group.component";
import {AddEditRolesGroupComponent} from "../../modals/add-edit-roles-group/add-edit-roles-group.component";
import {AddEditUsersGroupComponent} from "../../modals/add-edit-users-group/add-edit-users-group.component";
import * as UserActions from "../../../store/actions/user.actions";
import * as RoleActions from "../../../store/actions/role.actions";
import * as fromRole from "../../../store/reducers/role.reducers";
import {Role} from "../../../models/Role";

@Component({
  selector: 'group-table',
  templateUrl: './group-table.component.html',
  styleUrls: ['./group-table.component.scss']
})
export class GroupTableComponent {
    displayedColumns: string[] = ['NAME', 'NUMBER OF USERS', 'GRANTED ROLES', 'ACTIONS'];
    dataSource: MatTableDataSource<Group>;

    @Input() filterValue = '';
    @Input() filterPredicate: (data: Group, filter: string) => boolean;
    groupState = this.store.select(fromGroup.selectGroupState)
    userState = this.store.select(fromUser.selectUserState)
    roleState = this.store.select(fromRole.selectRoleState)


    @ViewChild(MatPaginator) paginator: MatPaginator;

    users: User[];
    groups: Group[];
    roles: Role[];

    constructor(private _cdRef: ChangeDetectorRef,
                private _matDialog: MatDialog,
                private store: Store<fromGroup.GroupState>
    ) {
        this.dataSource = new MatTableDataSource();
    }

    ngOnInit(): void {
        this.dataSource.filterPredicate = this.filterPredicate;
        this.filterChange();
        this.listenForDataChnages();
    }

    filterChange() {
        if (this.dataSource) {
            this.dataSource.filter = this.filterValue;
        }
    }

    listenForDataChnages() {
        this.store.dispatch(GroupActions.fetchGroups())
        this.groupState.subscribe(state => {
            this.dataSource.data = state.groups
        });
        this.store.dispatch(UserActions.fetchUsers())
        this.userState.subscribe(state => {
            this.users = state.users
        });
        this.store.dispatch(RoleActions.fetchRoles())
        this.roleState.subscribe(state => {
            this.roles = state.roles
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

    delete(group: Group) {
        const confirmActionDialogData: ConfirmActionDialogData = {
            message: "You really want to delete "+ group.name +" ?",        };
        this.openConfirmActionDialog(confirmActionDialogData).afterClosed().subscribe((res: any[]) => {
            if (res) {
                this.store.dispatch(GroupActions.deleteGroup({groupId: group.id}));
                }
        });
    }

    openEditGroupDialog(group: Group) {
        this._matDialog.open(AddEditGroupComponent, {
            data: group
        });
    }

    openGroupUserAssignmentDialogBox(group: Group) {
        this._matDialog.open(AddEditRolesGroupComponent, {
                data: {
                    group : group,
                    roles: this.roles
                }
            }
        );
    }

    editUserGroups(group: Group) {
        this._matDialog.open(AddEditUsersGroupComponent, {
                data: {group : group,
                    kcUsers: this.users
                }
            }
        );
    }
}
