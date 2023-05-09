import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from "./dashboard.component";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {Route, RouterModule} from "@angular/router";


const dashboard: Route[] = [
    {path: '**', component: DashboardComponent},

];
@NgModule({
  declarations: [DashboardComponent],
    imports: [
        RouterModule.forChild(dashboard),
        CommonModule,
        MatButtonModule,
        MatTooltipModule
    ]
})
export class DashboardModule { }
