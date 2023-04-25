import { Component, ViewEncapsulation } from '@angular/core';
import { FuseDrawerMode } from '@fuse/components/drawer';
import { Store } from '@ngrx/store';
import { Zone } from 'app/models/Zone';
import * as fromZone from '../../../store/reducers/zone.reducers'
import * as ZoneActions from '../../../store/actions/zone.actions'
import { Observable } from 'rxjs';
import {KeycloakService} from "keycloak-angular";

@Component({
    selector     : 'zone',
    templateUrl  : './zone.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ZoneComponent
{
    drawerMode: FuseDrawerMode;
    drawerOpened: boolean;
    treeData: Zone[];
    zoneState = this.store.select(fromZone.selectZoneState)
    public allRoles: string[];
    constructor(
        private store: Store<fromZone.ZoneState>,
        private keycloakService: KeycloakService
    )
    {
        this.drawerMode = 'side';
        this.drawerOpened = true;
        this.treeData = [];
    }

    ngOnInit() {
        this.store.dispatch(ZoneActions.fetchZones())
        this.zoneState.subscribe(state => {
            this.treeData = state.zones
        })
        // get the connected user roles array from keycloak and print it in the console
        this.allRoles= this.keycloakService.getUserRoles();
        console.log("connected user roles ");
        console.log(this.allRoles);

        //get the connected user token
        console.log("token is : ")
        this.keycloakService.getToken().then(e => console.log(e));

        // get the authenticated user info from keycloak service
        console.log("connected user info : ")
        this.keycloakService.loadUserProfile().then(e => console.log(e));
    }


    toggleDrawerMode(): void
    {
        this.drawerMode = this.drawerMode === 'side' ? 'over' : 'side';
    }

    toggleDrawerOpen(): void
    {
        this.drawerOpened = !this.drawerOpened;
    }

    drawerOpenedChanged(opened: boolean): void
    {
        this.drawerOpened = opened;
    }

}
