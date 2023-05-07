import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserContainerComponent} from "./user-container.component";
import {UserTableComponent} from "./user-table/user-table.component";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatMenuModule} from "@angular/material/menu";
import {SharedModule} from "../../shared/shared.module";
import {MatButtonModule} from "@angular/material/button";
import {AddUserComponent} from "../modals/add-user/add-user.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";



@NgModule({
    declarations: [UserContainerComponent, UserTableComponent,AddUserComponent],
    exports: [
        UserContainerComponent
    ],
    imports: [
        CommonModule,
        MatListModule,
        MatCardModule,
        MatPaginatorModule,
        MatIconModule,
        MatTableModule,
        MatMenuModule,
        SharedModule,
        MatButtonModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatInputModule
    ]
})
export class UserContainerModule { }
