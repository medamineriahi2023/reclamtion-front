import {ChangeDetectorRef, Component, Input, SimpleChanges, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Role } from 'app/models/Role';
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../../core/services/user/user.service";
import {ConfirmActionDialogData} from "../../modals/models";
import {
    ConfirmActionDialogComponent
} from "../../../shared/dialog/confirm-action-dialog/confirm-action-dialog.component";

@Component({
  selector: 'app-role-table',
  templateUrl: './role-table.component.html',
  styleUrls: ['./role-table.component.scss']
})
export class RoleTableComponent {
    displayedColumns: string[] = ['NAME', 'ACTIONS'];
    dataSource: MatTableDataSource<Role>;

    @Input() filterValue = '';
    @Input() filterPredicate: (data: Role, filter: string) => boolean;

    @ViewChild(MatPaginator) paginator: MatPaginator;


    constructor(private _cdRef: ChangeDetectorRef,
                private _matDialog: MatDialog,
                private userService:UserService
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
       this.userService.getRoles().subscribe(r => this.dataSource.data = r);
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

    // delete(role: Role) {
    //     const confirmActionDialogData: ConfirmActionDialogData = {
    //         message: "You really want to delete "+ role.name +" ?",        };
    //     this.openConfirmActionDialog(confirmActionDialogData).afterClosed().subscribe((res: any[]) => {
    //         if (res) {
    //             this.store.dispatch(RoleActions.deleteRole({roleName: role.name}));
    //         }
    //     });
    // }
    // editRole(role: Role) {
    //     this._matDialog.open(AddEditRoleComponent, {
    //         data:role
    //     });
    // }
    // editPermissions(role : Role) {
    //     this._matDialog.open(AddEditPermissionsComponent, {
    //         data : {
    //             role:role,
    //             permissions : this.permissions
    //         }});
    // }
}

