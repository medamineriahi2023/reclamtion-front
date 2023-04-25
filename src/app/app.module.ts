import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ExtraOptions, PreloadAllModules, RouterModule} from '@angular/router';
import {FuseModule} from '@fuse';
import {FuseConfigModule} from '@fuse/services/config';
import {FuseMockApiModule} from '@fuse/lib/mock-api';
import {CoreModule} from 'app/core/core.module';
import {appConfig} from 'app/core/config/app.config';
import {mockApiServices} from 'app/mock-api';
import {LayoutModule} from 'app/layout/layout.module';
import {AppComponent} from 'app/app.component';
import {appRoutes} from 'app/app.routing';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/app.states';
import {environment} from 'environments/environment.dev';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {UserEffects} from "./store/effects/user.effects";
import {GroupEffects} from "./store/effects/group.effects";
import {RoleEffects} from "./store/effects/role.effects";
import {PermissionEffects} from "./store/effects/permission.effects";

const routerConfig: ExtraOptions = {
    preloadingStrategy       : PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),
        CoreModule,
        EffectsModule.forRoot([ UserEffects, GroupEffects, RoleEffects, PermissionEffects]),
        LayoutModule,
        StoreModule.forRoot(reducers, {}),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
