import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfigurationsComponent} from "./configurations.component";
import {MatIconModule} from "@angular/material/icon";
import {SharedModule} from "../../../shared/shared.module";
import {Route, RouterModule} from "@angular/router";
import {LdapContainerModule} from "../../../components/ldap-container/ldap-container.module";


const configurationRoutes: Route[] = [
    {path: '**', component: ConfigurationsComponent},

];

@NgModule({
  declarations: [
      ConfigurationsComponent
  ],
    imports: [
        RouterModule.forChild(configurationRoutes),
        CommonModule,
        MatIconModule,
        SharedModule,
        LdapContainerModule
    ]
})
export class ConfigurationsModule { }
