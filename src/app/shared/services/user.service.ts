import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs' ;

import { API_PATH } from '@constants/api-path';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private httpClient: HttpClient
  ){}

  login(payload: any): Observable<any>{
    const convertedPayload = new FormData()
    convertedPayload.append("username",payload.username)
    convertedPayload.append("password",payload.password)
    return this.httpClient.post<any>(API_PATH.login, convertedPayload);
  }

}
