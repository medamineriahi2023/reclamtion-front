import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Role} from "../../../models/Role";
import {MatSelect} from "@angular/material/select";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {MatOption} from "@angular/material/core";
import * as GroupActions from "../../../store/actions/group.actions";

@Component({
  selector: 'app-add-edit-roles-group',
  templateUrl: './add-edit-roles-group.component.html',
  styleUrls: ['./add-edit-roles-group.component.scss']
})
export class AddEditRolesGroupComponent implements AfterViewInit{
    roles: Role[];
    rolesId : any[] = [];

    @ViewChild('rolesList', {static: false}) rolesList: MatSelect;
    filter: string;


    constructor(
        public dialogRef: MatDialogRef<AddEditRolesGroupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public store:Store,
        private cd: ChangeDetectorRef) {
        data.group.roles.forEach(g => this.rolesId.push(g.id));
        this.roles = data.roles;


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
        let groupId = this.data.group.id;
        let rolesIds : any[];
        this.rolesId = this.rolesList.value;
        rolesIds = this.rolesId;
        this.store.dispatch(GroupActions.assignRolesToGroup({groupId, rolesIds}))
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
        this.roles = this.data.roles.filter(r => r.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    }
}
