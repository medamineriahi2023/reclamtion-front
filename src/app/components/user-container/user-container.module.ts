import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddUserComponent} from "../modals/add-user/add-user.component";
import {EditUserGroupsComponent} from "../modals/edit-user-groups/edit-user-groups.component";
import {AddEditUserRolesComponent} from "../modals/add-edit-user-roles/add-edit-user-roles.component";
import {ResetPasswordComponent} from "../modals/reset-password/reset-password.component";
import {MatIconModule} from "@angular/material/icon";
import {MatOptionModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatMenuModule} from "@angular/material/menu";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {SharedModule} from "../../shared/shared.module";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {UserContainerComponent} from "./user-container.component";
import {UserTableComponent} from "./user-table/user-table.component";



@NgModule({
    declarations: [
        AddUserComponent,
        EditUserGroupsComponent,
        AddEditUserRolesComponent,
        ResetPasswordComponent,
        UserContainerComponent,
        UserTableComponent
    ],
    exports: [
        UserContainerComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatOptionModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        MatTooltipModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        MatMenuModule,
        MatTableModule,
        MatCardModule,
        MatListModule,
        MatButtonModule,
        SharedModule,
        MatCheckboxModule
    ]
})
export class UserContainerModule { }
