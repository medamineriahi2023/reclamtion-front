import {Component, OnInit ,Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/user";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {CustomValidators} from "../../../core/utils/CustomValidators";
import * as UserActions from "../../../store/actions/user.actions";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
    userForm: FormGroup;
    user: User = {id: undefined, userName: '', name: '', active: false, isInternal: false, email: '', password: '', externalId: '', roles: [] , groups: [], firstName: '', lastName: '', phone : ''};
    title?: string;
    operation?:string;
    submitted = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<AddUserComponent>,public store: Store,
    ) {
        if (this.data == null){
            this.title = "Add new user";
            this.operation = "Save";
        }else {
            this.title = "Update user";
            this.operation = "Update";
        }
        this.userForm = new FormGroup({
                // externalId: new FormControl(null, []),
                userName: new FormControl(this.data?.fix?.userName, [Validators.required]),
                firstName: new FormControl(this.data?.fix?.firstName, [Validators.required]),
                phone: new FormControl(this.data?.fix?.phone,Validators.maxLength(8)),
                lastName: new FormControl(this.data?.fix?.lastName,[Validators.required]),
                email: new FormControl(this.data?.fix?.email,[Validators.required, Validators.email]),
                password: new FormControl(this.data?.fix?.password,this.operation == 'Save'?[Validators.required]:null),
                confirmPassword: new FormControl(this.data?.fix?.password,this.operation == 'Save'?[Validators.required]:null),
                active: new FormControl(this.data?.fix?.active)
            },
            CustomValidators.mustMatch('password', 'confirmPassword')
        );
    }


    onSubmit() {
        this.user.userName = this.userForm.get('userName').value;
        this.user.firstName = this.userForm.get('firstName').value;
        this.user.lastName = this.userForm.get('lastName').value;
        this.user.email = this.userForm.get('email').value;
        this.user.isInternal = true;
        this.user.password = this.userForm.get('password').value;
        this.user.phone = this.userForm.get('phone').value;
        this.user.active = this.userForm.get('active').value;
        if (this.operation === "Save"){
            this.store.dispatch(UserActions.addUser({user: this.user}))
        }else {
        this.user.id = this.data.fix.id;
        this.store.dispatch(UserActions.updateUser({user: this.user}))
        }
        this.submitted = true;
        this.dialogRef.close();

    }

    close() {
        this.dialogRef.close();
    }
}
