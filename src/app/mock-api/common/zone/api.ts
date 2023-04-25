import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { zones as ZonesData  } from 'app/mock-api/common/zone/data';
import { Zone } from 'app/models/Zone';

@Injectable({
    providedIn: 'root'
})
export class ZoneMockApi
{
    public _zones: Zone[] = ZonesData;

    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService)
    {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void
    {
        // -----------------------------------------------------------------------------------------------------
        // @ AllZones - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/zone/zones')
            .reply(() => [200, cloneDeep(this._zones)]);

        // -----------------------------------------------------------------------------------------------------
        // @ Zone - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/zone/zone')
            .reply(({request}) => {
                const id = request.params.get('id');
                return [200, cloneDeep(this._zones.find((zone: Zone) => zone.id === id))];
            });

            // -----------------------------------------------------------------------------------------------------
        // @ Zone - POST
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
        .onPost('api/zone/zone')
        .reply(({request}) => {
            let zones = cloneDeep(this._zones)
            zones.push(request.body.zone)
            return [200, zones];
        });
    }
}
