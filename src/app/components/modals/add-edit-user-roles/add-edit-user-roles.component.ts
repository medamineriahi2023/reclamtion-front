import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {MatSelect} from "@angular/material/select";
import {MatOption} from "@angular/material/core";
import * as UserActions from "../../../store/actions/user.actions";
import {Role} from "../../../models/Role";

@Component({
  selector: 'app-add-edit-user-roles',
  templateUrl: './add-edit-user-roles.component.html',
  styleUrls: ['./add-edit-user-roles.component.scss']
})
export class AddEditUserRolesComponent implements AfterViewInit{

    roles: Role[];
    rolesId : any[] = [];
    filter:string;

    @ViewChild('groupsList', {static: false}) groupList: MatSelect;


    constructor(
        public dialogRef: MatDialogRef<AddEditUserRolesComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public store:Store,
        private cd: ChangeDetectorRef) {
        data.fix.roles.forEach(g => this.rolesId.push(g.id));
        this.roles = data.roles;

    }

    ngAfterViewInit(): void {
        this.groupList.options.forEach((option: MatOption) => {
            if (this.rolesId.indexOf(option.value) !== -1) {
                option.select();
            }
        });
        this.cd.detectChanges();
    }




    add(){
        let userId = this.data.fix.id;
        let rolesId : any[];
        this.rolesId = this.groupList.value;
        rolesId = this.rolesId;
        this.store.dispatch(UserActions.assignRolesToUser({userId, rolesId}))
        this.dialogRef.close();
    }
    close() {
        this.dialogRef.close();
    }

    toggleAllSelection(event) {

        if (event.source.selected){
            this.groupList.options.forEach((option: MatOption) => {
                option.select();
            });
        }
        else
            this.groupList.value = [];

    }

    filterChange(filter: string) {
        this.roles = this.data.roles.filter(r => r.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    }

}
