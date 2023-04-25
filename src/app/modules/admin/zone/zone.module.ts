import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {Route, RouterModule} from '@angular/router';
import {FuseDrawerModule} from '@fuse/components/drawer';
import {TreeDisplayModule} from 'app/components/treeDisplay/treeDisplay.module';
import {IconsModule} from 'app/core/icons/icons.module';
import {ZoneComponent} from './zone.component';

const zoneRoutes: Route[] = [
    {
        path     : '',
        component: ZoneComponent
    }
];

@NgModule({
    declarations: [
        ZoneComponent
    ],
    imports     : [
        RouterModule.forChild(zoneRoutes),
        MatButtonModule,
        FuseDrawerModule,
        TreeDisplayModule,
        IconsModule,
        MatIconModule,
        CommonModule,
    ]
})
export class ZoneModule
{
}
