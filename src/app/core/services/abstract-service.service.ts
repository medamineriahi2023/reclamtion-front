import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Operation} from "../../models/Operation";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractServiceService<T> {
    url = "http://localhost:8090/";
  protected constructor(endPoint : string, public http :HttpClient) {
      this.url += endPoint;
  }


  save(entity :T): Observable<T>{
      return this.http.post<T>(this.url, entity);
  }

    getAll(): Observable<T[]>{
        return this.http.get<T[]>(this.url);
    }

    delete(operationId: any){
        return this.http.delete<T[]>(this.url+`/${operationId}`);
    }

    update(operation: any){
        return this.http.put<T[]>(this.url, operation);
    }


}
