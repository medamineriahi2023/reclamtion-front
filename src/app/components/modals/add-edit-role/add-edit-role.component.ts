import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import * as RoleActions from "../../../store/actions/role.actions";
import {Role} from "../../../models/Role";

@Component({
  selector: 'app-add-edit-role',
  templateUrl: './add-edit-role.component.html',
  styleUrls: ['./add-edit-role.component.scss']
})
export class AddEditRoleComponent{
    roleForm: FormGroup;
    role: Role = {id: undefined, name: ''};
    submitted = false;

    title?: string;
    operation?:string;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                public dialogRef: MatDialogRef<AddEditRoleComponent>,public store: Store,) {
        if (this.data == null){
            this.title = "Add new role";
            this.operation = "Save";
        }else {
            this.title = "Update role";
            this.operation = "Update";
        }
        this.roleForm = new FormGroup({
                name: new FormControl(this.data?.name, [Validators.required]),
            },
        );
    }


    onSubmit() {

        this.role.name = this.roleForm.get('name').value;
        if (this.operation === "Save"){
            this.store.dispatch(RoleActions.addRole({role: this.role}))
        }else {
            this.role.id = this.data.id;
            this.store.dispatch(RoleActions.updateRole({role: this.role}))
        }
        this.submitted = true;
        this.dialogRef.close();
    }

    close() {
        this.dialogRef.close();
    }

}
