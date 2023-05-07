import {ChangeDetectorRef, Component, Input, SimpleChanges, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../../core/services/user/user.service";
import {ConfirmActionDialogData} from "../../modals/models";
import {
    ConfirmActionDialogComponent
} from "../../../shared/dialog/confirm-action-dialog/confirm-action-dialog.component";
import {User} from "../../../models/User";
import {Role} from "../../../models/Role";

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {
    displayedColumns: string[] = ['FIRST NAME','LAST NAME', 'USER NAME', 'EMAIL', 'STATUS', 'ACTIONS'];
    dataSource: MatTableDataSource<User>;
    @Input() refresh :boolean;
    @Input() filterValue = '';
    @Input() filterPredicate: (data: User, filter: string) => boolean;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    users: User[] = [];
    roles: Role[];

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

        this.userService.getAll().subscribe(u => {this.dataSource.data = u ; this.refresh = false;});

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.filterValue) {
            this.filterChange();
        }
        if (changes.refresh) {
            this.listenForDataChnages();
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

    // delete(user: User) {
    //     const confirmActionDialogData: ConfirmActionDialogData = {
    //         message: "You really want to delete "+ user.userName +" ?",
    //         errorMessage: "be carefull this user is active !"
    //     };
    //     this.openConfirmActionDialog(confirmActionDialogData).afterClosed().subscribe((res: any[]) => {
    //         if (res) {
    //             this.store.dispatch(deleteUser({ username: user.userName }));
    //         }
    //     });
    // }
    //
    // edit_user(user: User) {
    //     this._matDialog.open(AddUserComponent, {
    //         data: {
    //             fix: user,
    //         }
    //     });
    // }
    //
    // edit_user_groups(user: User) {
    //     this._matDialog.open(EditUserGroupsComponent, {
    //             data: {
    //                 fix: user,
    //                 groups: this.groups,
    //                 groupList : this.groupList
    //             }
    //         }
    //     );
    // }
    //
    // edit_user_roles(user: User) {
    //     this._matDialog.open(AddEditUserRolesComponent, {
    //             data: {
    //                 fix: user,
    //                 roles: this.roles
    //             }
    //         }
    //     );
    // }
    //
    // resetPassword(user: User){
    //     this._matDialog.open(ResetPasswordComponent, {
    //             data: user.id
    //         }
    //     );
    // }
}
