import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import {AddEditRoleComponent} from "../modals/add-edit-role/add-edit-role.component";
import {AddEditPermissionsComponent} from "../modals/add-edit-permissions/add-edit-permissions.component";
import {RoleTableComponent} from "./role-table/role-table.component";
import {RoleContainerComponent} from "./role-container.component";



@NgModule({
    declarations: [
        RoleTableComponent,
        AddEditRoleComponent,
        AddEditPermissionsComponent,
        RoleContainerComponent
    ],
    exports: [
        RoleContainerComponent
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
        SharedModule
    ]
})
export class RoleContainerModule { }
