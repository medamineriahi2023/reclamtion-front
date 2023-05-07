import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../models/User";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../../core/utils/CustomValidators";
import {UserService} from "../../../core/services/user/user.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
    userForm: FormGroup;
    user: User = {id: undefined, username: '', firstName: '', lastName: '', email: '', enabled: true, password: ''};
    title?: string;
    operation?:string;
    submitted = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<AddUserComponent>,
        private userService:UserService,
    ) {
        if (this.data == null){
            this.title = "Add new user";
            this.operation = "Save";
        }else {
            this.title = "Update user";
            this.operation = "Update";
        }
        this.userForm = new FormGroup({
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
        this.user.username = this.userForm.get('userName').value;
        this.user.firstName = this.userForm.get('firstName').value;
        this.user.lastName = this.userForm.get('lastName').value;
        this.user.email = this.userForm.get('email').value;
        this.user.password = this.userForm.get('password').value;
        this.user.enabled = this.userForm.get('active').value;
        if (this.operation === "Save"){
            this.userService.save(this.user).subscribe(u => u);
        }else {
            this.user.id = this.data.fix.id;
            this.userService.update(this.user).subscribe(u => u);
        }
        this.submitted = true;
        this.dialogRef.close();

    }

    close() {
        this.dialogRef.close();
    }
}
