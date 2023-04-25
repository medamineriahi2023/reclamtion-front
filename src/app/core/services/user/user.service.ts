import { Injectable } from '@angular/core';
import {Comment} from "../../../models/Comment";
import {Observable} from "rxjs";
import {Operation} from "../../../models/Operation";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
    public url: string;

  constructor(public http:HttpClient) {
      this.url = "http://localhost:8090/user"
  }


    getUserName(userId: string ): Observable<Map<string, string>>{
        return this.http.get<Map<string, string>>(this.url + `/${userId}` );
    }
}
