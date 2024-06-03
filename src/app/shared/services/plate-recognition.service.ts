import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { API_PATH } from '@constants/api-path';

@Injectable({
  providedIn: "root",
})
export class PlateRecognitonService {
  constructor (
    private httpClient: HttpClient
  ){}
  recognition(payload: any): Observable<any> {
    return this.httpClient.post<any>(API_PATH.recognition, payload);
  }
}
