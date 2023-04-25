import { Injectable } from '@angular/core';
import { assign, cloneDeep } from 'lodash-es';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { user as userData } from 'app/mock-api/common/user/data';
import { groups as groupData } from 'app/mock-api/common/groups/data';
import {roles as rolesData} from 'app/mock-api/common/roles/data';


@Injectable({
    providedIn: 'root'
})
export class UserMockApi
{

    private _user: any = userData;
    private _groups: any = groupData;
    private _roles: any = rolesData;

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
        // @ User - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/common/user')
            .reply(() => [200, cloneDeep(this._user)]);

        this._fuseMockApiService
            .onGet('api/user/users')
            .reply(() => [200, cloneDeep(this._user)]);


        this._fuseMockApiService
            .onGet('api/user/groups')
            .reply(() => [200, cloneDeep(this._groups)]);


        this._fuseMockApiService
            .onGet('api/user/roles')
            .reply(() => [200, cloneDeep(this._roles)]);


        // -----------------------------------------------------------------------------------------------------
        // @ User - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPatch('api/common/user')
            .reply(({request}) => {

                // Get the user mock-api
                const user = cloneDeep(request.body.user);

                // Update the user mock-api
                this._user = assign({}, this._user, user);

                // Return the response
                return [200, cloneDeep(this._user)];
            });

        this._fuseMockApiService
            .onPost('api/user/save')
            .reply(({request}) => {
                let users = cloneDeep(this._user)
                users.push(request.body.user)
                return [200, users];
            });


        this._fuseMockApiService
            .onDelete('api/user/delete/:userName')
            .reply(({request}) => {

                // Get the username from the request URL
                // @ts-ignore
                const username = request.params.userName;

                // Find the index of the user to be deleted
                const index = this._user.findIndex(user => user.username === username);

                if (index === -1) {
                    // If the user is not found, return a 404 error
                    return [404, { error: 'User not found' }];
                } else {
                    // Remove the user from the array
                    const deletedUser = this._user.splice(index, 1)[0];

                    // Return the deleted user
                    return [200, deletedUser];
                }
            });


    }
}
