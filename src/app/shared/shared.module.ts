import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainContainerComponent } from './main-container/main-container.component';
import {FilterComponent} from "./filter/filter.component";
import {MatInputModule} from "@angular/material/input";
import {ConfirmActionDialogComponent} from "./dialog/confirm-action-dialog/confirm-action-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatDialogModule,
        MatListModule,
        MatIconModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MainContainerComponent,
        FilterComponent
    ],
    declarations: [
        MainContainerComponent,
        FilterComponent,
        ConfirmActionDialogComponent
    ]
})
export class SharedModule
{
}
