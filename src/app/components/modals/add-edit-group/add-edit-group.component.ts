import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Group} from "../../../models/Group";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import * as GroupActions from "../../../store/actions/group.actions";
import {Store} from "@ngrx/store";


@Component({
  selector: 'add-edit-group',
  templateUrl: './add-edit-group.component.html',
  styleUrls: ['./add-edit-group.component.scss']
})
export class AddEditGroupComponent{
    groupForm: FormGroup;
    group: Group = {id: undefined, name: '', groupName: '', description: undefined, users: [], roles: []};
    submitted = false;

    title?: string;
    operation?:string;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                public dialogRef: MatDialogRef<AddEditGroupComponent>,public store: Store,) {
        if (this.data == null){
            this.title = "Add new group";
            this.operation = "Save";
        }else {
            this.title = "Update group";
            this.operation = "Update";
        }
        this.groupForm = new FormGroup({
                name: new FormControl(this.data?.name, [Validators.required]),
            },
        );
    }

    onSubmit() {

        this.group.name = this.groupForm.get('name').value;
        if (this.operation === "Save"){
            this.store.dispatch(GroupActions.addGroup({group: this.group}))
        }else {
            this.group.id = this.data.id;
            this.store.dispatch(GroupActions.updateGroup({group: this.group}))
        }

        this.submitted = true;
        this.dialogRef.close();
    }

    close() {
        this.dialogRef.close();
    }

}
