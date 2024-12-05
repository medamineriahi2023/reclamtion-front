import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AbstractServiceService} from "../abstract-service.service";
import {User} from "../../../models/User";
import {Role} from "../../../models/Role";

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractServiceService<User>{
    public url: string;

  constructor(public http:HttpClient) {
      super("user" , http);
  }


    getUserName(userId: string ): Observable<Map<string, string>>{
        return this.http.get<Map<string, string>>(this.url + `/${userId}` );
    }

    getRoles(): Observable<Role[]>{
        return this.http.get<Role[]>(this.url + `/roles` );
    }

    resetPassword(data: any, password: any) {

    }

    assignRolesToUser(userId: string, rolesId: any[]): Observable<any> {
        return null;
    }
}
