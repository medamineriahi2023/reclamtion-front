import {AfterViewInit, ChangeDetectorRef, Component, Inject, ViewChild} from '@angular/core';
import {Role} from "../../../models/Role";
import {MatSelect} from "@angular/material/select";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {MatOption} from "@angular/material/core";
import * as RoleActions from "../../../store/actions/role.actions";

@Component({
  selector: 'app-add-edit-permissions',
  templateUrl: './add-edit-permissions.component.html',
  styleUrls: ['./add-edit-permissions.component.scss']
})
export class AddEditPermissionsComponent implements AfterViewInit{
    roles: Role[];
    permissions: Role[];
    rolesId : any[] = [];
    filter:string;

    @ViewChild('rolesList', {static: false}) rolesList: MatSelect;


    constructor(
        public dialogRef: MatDialogRef<AddEditPermissionsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public store:Store,
        private cd: ChangeDetectorRef) {

        data.role.permissions.forEach(g => this.rolesId.push(g.id));

        this.permissions = data.permissions;


    }

    ngAfterViewInit(): void {
        this.rolesList.options.forEach((option: MatOption) => {
            if (this.rolesId.indexOf(option.value) !== -1) {
                option.select();
            }
        });
        this.cd.detectChanges();
    }




    add(){
        let roleId = this.data.role.id;
        let rolesIds : any[];
        this.rolesId = this.rolesList.value;
        rolesIds = this.rolesId;
        this.store.dispatch(RoleActions.assignCompositeRolesForRole({roleId, rolesIds}))
        this.dialogRef.close();
    }
    close() {
        this.dialogRef.close();
    }

    toggleAllSelection(event) {

        if (event.source.selected){
            this.rolesList.options.forEach((option: MatOption) => {
                option.select();
            });
        }
        else
            this.rolesList.value = [];

    }

    filterChange(filter: string) {
        this.permissions = this.data.permissions.filter(r => r.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    }


}
