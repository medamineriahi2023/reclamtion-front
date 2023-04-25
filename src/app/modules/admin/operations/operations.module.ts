import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OperationsComponent} from "./operations.component";
import {GroupContainerModule} from "../../../components/group-container/group-container.module";
import {MatIconModule} from "@angular/material/icon";
import {RoleContainerModule} from "../../../components/role-container/role-container.module";
import {SharedModule} from "../../../shared/shared.module";
import {UserContainerModule} from "../../../components/user-container/user-container.module";
import {Route, RouterModule} from "@angular/router";
import {SecurityComponent} from "../security/security.component";
import {ReclamationsContainerModule} from "../../../components/operations-container/reclamations-container.module";


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
        GroupContainerModule,
        MatIconModule,
        RoleContainerModule,
        SharedModule,
        UserContainerModule,
        ReclamationsContainerModule
    ]
})
export class OperationsModule { }
