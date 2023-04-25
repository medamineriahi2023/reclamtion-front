import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {CustomValidators} from "../../../core/utils/CustomValidators";
import * as UserActions from "../../../store/actions/user.actions";


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
    passForm: FormGroup;
    submitted = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                public dialogRef: MatDialogRef<ResetPasswordComponent>,public store: Store,) {
        this.passForm = new FormGroup({
                password: new FormControl(null, [Validators.required]),
                repeatPassword: new FormControl(null, [Validators.required]),
            },
            CustomValidators.mustMatch('password', 'repeatPassword')
        );
    }


    onSubmit() {

        let password = this.passForm.get('password').value;

        this.store.dispatch(UserActions.resetPassword({userId: this.data, newPassword: password}))
        this.submitted = true;
        this.dialogRef.close();
    }

    close() {
        this.dialogRef.close();
    }

}
