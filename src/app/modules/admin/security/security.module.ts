import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {Route, RouterModule} from '@angular/router';
import {FuseDrawerModule} from '@fuse/components/drawer';
import {IconsModule} from 'app/core/icons/icons.module';
import {SecurityComponent} from './security.component';
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTooltipModule} from "@angular/material/tooltip";
import {UserContainerModule} from "../../../components/user-container/user-container.module";
import {RoleContainerModule} from "../../../components/role-container/role-container.module";

const securityRoutes: Route[] = [
    {path: '**', component: SecurityComponent},

];

@NgModule({
    declarations: [
        SecurityComponent
    ],
    imports: [
        RouterModule.forChild(securityRoutes),
        MatButtonModule,
        FuseDrawerModule,
        IconsModule,
        MatIconModule,
        CommonModule,
        MatInputModule,
        FormsModule,
        SharedModule,
        MatCardModule,
        MatListModule,
        MatMenuModule,
        MatPaginatorModule,
        MatTableModule,
        MatCheckboxModule,
        MatTooltipModule,
        UserContainerModule,
        RoleContainerModule,
    ]
})
export class SecurityModule
{
}
