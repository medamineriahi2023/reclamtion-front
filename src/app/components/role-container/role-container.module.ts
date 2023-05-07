import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RoleContainerComponent} from "./role-container.component";
import { RoleTableComponent } from './role-table/role-table.component';
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import {SharedModule} from "../../shared/shared.module";



@NgModule({
    declarations: [RoleContainerComponent, RoleTableComponent],
    exports: [
        RoleContainerComponent
    ],
    imports: [
        CommonModule,
        MatListModule,
        MatCardModule,
        MatTableModule,
        MatMenuModule,
        MatIconModule,
        MatPaginatorModule,
        MatButtonModule,
        SharedModule
    ]
})
export class RoleContainerModule { }
