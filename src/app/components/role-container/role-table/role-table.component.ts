import {ChangeDetectorRef, Component, Input, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../../models/user";
import * as fromRole from "../../../store/reducers/role.reducers";
import * as fromPermission from "../../../store/reducers/permission.reducers";
import {MatPaginator} from "@angular/material/paginator";
import {Group} from "../../../models/Group";
import {MatDialog} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {UserService} from "../../../core/user/user.service";
import * as RoleActions from "../../../store/actions/role.actions";
import * as PermissionActions from "../../../store/actions/permission.actions";
import {Role} from "../../../models/Role";
import {AddEditRoleComponent} from "../../modals/add-edit-role/add-edit-role.component";
import {ConfirmActionDialogData} from "../../modals/models";
import {ConfirmActionDialogComponent} from "../../../shared/dialog/confirm-action-dialog/confirm-action-dialog.component";
import {AddEditPermissionsComponent} from "../../modals/add-edit-permissions/add-edit-permissions.component";

@Component({
  selector: 'role-table',
  templateUrl: './role-table.component.html',
  styleUrls: ['./role-table.component.scss']
})
export class RoleTableComponent {
    displayedColumns: string[] = ['NAME', 'ACTIONS'];
    dataSource: MatTableDataSource<Role>;
    roleState = this.store.select(fromRole.selectRoleState)
    permissionState = this.store.select(fromPermission.selectPermissionState)

    @Input() filterValue = '';
    @Input() filterPredicate: (data: Role, filter: string) => boolean;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    users: User[] = [];
    groups: Group[];
    permissions :Role[];

    constructor(private _cdRef: ChangeDetectorRef,
                private _matDialog: MatDialog,
                private store: Store<fromRole.RoleState>,
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
        this.store.dispatch(RoleActions.fetchRoles())
        this.roleState.subscribe(state => {
            this.dataSource.data = state.roles
        })
        this.store.dispatch(PermissionActions.fetchPermissions())
        this.permissionState.subscribe(state => {
            this.permissions = state.roles
        })
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

    delete(role: Role) {
        const confirmActionDialogData: ConfirmActionDialogData = {
            message: "You really want to delete "+ role.name +" ?",        };
        this.openConfirmActionDialog(confirmActionDialogData).afterClosed().subscribe((res: any[]) => {
            if (res) {
                this.store.dispatch(RoleActions.deleteRole({roleName: role.name}));
            }
        });
    }
    editRole(role: Role) {
        this._matDialog.open(AddEditRoleComponent, {
            data:role
        });
    }
    editPermissions(role : Role) {
        this._matDialog.open(AddEditPermissionsComponent, {
            data : {
            role:role,
            permissions : this.permissions
            }});
    }
}
