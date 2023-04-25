import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatSelect} from "@angular/material/select";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {MatOption} from "@angular/material/core";
import * as GroupActions from "../../../store/actions/group.actions";
import {User} from "../../../models/user";

@Component({
  selector: 'app-add-edit-users-group',
  templateUrl: './add-edit-users-group.component.html',
  styleUrls: ['./add-edit-users-group.component.scss']
})
export class AddEditUsersGroupComponent implements AfterViewInit{

    users: User[];
    usersIds : any[] = [];
    filter:string;


    @ViewChild('usersList', {static: false}) usersList: MatSelect;


    constructor(
        public dialogRef: MatDialogRef<AddEditUsersGroupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public store:Store,
        private cd: ChangeDetectorRef) {
        data.group.kcUsers.forEach(g => this.usersIds.push(g.id));
        this.users = data.kcUsers;

    }

    ngAfterViewInit(): void {
        this.usersList.options.forEach((option: MatOption) => {
            if (this.usersIds.indexOf(option.value) !== -1) {
                option.select();
            }
        });
        this.cd.detectChanges();
    }




    add(){
        this.usersList.value = this.usersList.value.filter(v => v != undefined);
        let groupId = this.data.group.id;
        let usersIds : any[];
        this.usersIds = this.usersList.value;
        usersIds = this.usersIds;
        this.store.dispatch(GroupActions.assignUsersToGroup({groupId, usersIds}))
        this.dialogRef.close();
    }
    close() {
        this.dialogRef.close();
    }

    toggleAllSelection(event) {

        if (event.source.selected){
            this.usersList.options.forEach((option: MatOption) => {
                    option.select();
            });
        }
        else
        this.usersList.value = [];

    }

    filterChange(filter: string) {
        this.users = this.data.kcUsers.filter(r => r.userName.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    }



}
