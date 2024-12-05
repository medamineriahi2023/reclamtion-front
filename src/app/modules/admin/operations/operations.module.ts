import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OperationsComponent} from "./operations.component";
import {MatIconModule} from "@angular/material/icon";
import {SharedModule} from "../../../shared/shared.module";
import {Route, RouterModule} from "@angular/router";


const reclamationsRoutes: Route[] = [
    {path: '**', component: OperationsComponent},

];
@NgModule({

  declarations: [
      OperationsComponent,
  ],
    imports: [
        RouterModule.forChild(reclamationsRoutes),
        CommonModule,
        MatIconModule,
        SharedModule
    ]
})
export class OperationsModule { }
