import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, ReplaySubject, tap} from 'rxjs';
import {Group} from "../../models/Group";
import {Role} from "../../models/Role";
import {User as UserRequest} from "../../models/user";
import {User} from "./user.types";

@Injectable({
    providedIn: 'root'
})
export class UserService
{
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User)
    {
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<User>
    {
        return this._user.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */
    get(): Observable<User>
    {
        return this._httpClient.get<User>('api/common/user').pipe(
            tap((user) => {
                this._user.next(user);
            })
        );
    }

    getAll(): Observable<User[]>
    {
        return this._httpClient.get<User[]>('http://localhost:8080/cs/users')
    }

    getAllGroups(): Observable<Group[]>
    {
        return this._httpClient.get<Group[]>('http://localhost:8080/cs/groups')
    }


    getAllRoles(): Observable<Role[]>
    {
        return this._httpClient.get<Role[]>('http://localhost:8080/cs/roles')
    }

    getAllPermissions(): Observable<Role[]>
    {
        return this._httpClient.get<Role[]>('http://localhost:8080/cs/users/permissions')
    }
    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any>
    {
        return this._httpClient.patch<User>('api/common/user', {user}).pipe(
            map((response) => {
                this._user.next(response);
            })
        );
    }

    updateUser(user: UserRequest): Observable<UserRequest[]>
    {
        return this._httpClient.put<UserRequest[]>(`http://localhost:8080/cs/users`, user);
    }

    updateGroup(group: Group): Observable<Group[]>
    {
        return this._httpClient.put<Group[]>(`http://localhost:8080/cs/groups`, group);
    }


    save(user: UserRequest): Observable<UserRequest[]>
    {
        return this._httpClient.post<UserRequest[]>(`http://localhost:8080/cs/users`, user);
    }

    saveRole(role: Role): Observable<Role[]>
    {
        return this._httpClient.post<Role[]>(`http://localhost:8080/cs/roles/${role.name}`, {});
    }

    updateRole(role: Role): Observable<Role[]>
    {
        return this._httpClient.put<Role[]>(`http://localhost:8080/cs/roles`, role);
    }

    saveGroup(group: Group): Observable<Group[]>
    {
        return this._httpClient.post<Group[]>(`http://localhost:8080/cs/group/${group.name}`,{});
    }

    deleteGroup(groupId: string) {
        return this._httpClient.delete(`http://localhost:8080/cs/groups/${groupId}`);
    }

    deleteRole(roleName: string) {
        return this._httpClient.delete(`http://localhost:8080/cs/roles/${roleName}`);
    }

    delete(userName: string) {
        return this._httpClient.delete(`http://localhost:8080/cs/users/${userName}`);
    }

    assignUserToGroups(userId: string, groupIds: string[]) {
        const requestBody = {
            userId: userId,
            groupIds: groupIds
        };
        return this._httpClient.post('http://localhost:8080/cs/api/assignUserToGroups', requestBody);
    }

    assignRolesToUser(userId: string, roleIds: string[]) {
        const requestBody = {
            userId: userId,
            roleIds: roleIds
        };
        return this._httpClient.post('http://localhost:8080/cs/api/assignRolesToUser', requestBody);
    }

    resetPassword(userId: string, newPassword: string) {
        return this._httpClient.post(`http://localhost:8080/cs/users/resetPassword/${userId}/${newPassword}`, {});
    }

    assignRolesToGroup(groupId: string, roleIds: string[]) {
        const requestBody = {
            groupId: groupId,
            roleIds: roleIds
        };
        return this._httpClient.post('http://localhost:8080/cs/api/assignRolesToGroup', requestBody);
    }

    assignUsersToGroup(groupId: string, usersIds: string[]) {
        const requestBody = {
            groupId: groupId,
            userIds: usersIds
        };
        return this._httpClient.post('http://localhost:8080/cs/api/assignUsersToGroup', requestBody);
    }

    assignCompositeRolesForRole(roleId: string, rolesIds: string[]) {
        const requestBody = {
            roleId: roleId,
            rolesIds: rolesIds
        };
        return this._httpClient.post('http://localhost:8080/cs/api/assignCompositeRolesForRole', requestBody);
    }

}
