import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReclamationsContainerComponent} from "./reclamations-container.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {SharedModule} from "../../shared/shared.module";
import {PublicationContainerComponent} from './publication-container/publication-container.component';
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from "@angular/material/input";
import {ReclamationContentComponent} from './reclamation-content/reclamation-content.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {SkeletonModule} from "primeng/skeleton";
import {AddPostComponent} from "../modals/add-post/add-post.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
    declarations: [
        ReclamationsContainerComponent,
        PublicationContainerComponent,
        ReclamationContentComponent,
        AddPostComponent
    ],
    exports: [
        ReclamationsContainerComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        SharedModule,
        MatCardModule,
        MatListModule,
        MatInputModule,
        MatProgressSpinnerModule,
        SkeletonModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatSelectModule
    ]
})
export class ReclamationsContainerModule { }
