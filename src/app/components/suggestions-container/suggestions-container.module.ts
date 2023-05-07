import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SuggestionsContainerComponent} from "./suggestions-container.component";
import { SuggestionsContentComponent } from './suggestions-content/suggestions-content.component';
import {SkeletonModule} from "primeng/skeleton";
import {ReclamationsContainerModule} from "../operations-container/reclamations-container.module";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {SharedModule} from "../../shared/shared.module";



@NgModule({
    declarations: [SuggestionsContainerComponent, SuggestionsContentComponent],
    exports: [
        SuggestionsContainerComponent
    ],
    imports: [
        CommonModule,
        SkeletonModule,
        MatButtonModule,
        MatIconModule,
        SharedModule,
        ReclamationsContainerModule
    ]
})
export class SuggestionsContainerModule { }
