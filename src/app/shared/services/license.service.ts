import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { API_PATH } from '@constants/api-path';
import { LICENSE_STATUS } from "@constants/license-status";

@Injectable({
  providedIn: "root",
})
export class LicenseService {
  constructor(private httpClient: HttpClient) {
  }
  private infoLicense: any = {}
  activateLicense(liceseToken: string): Observable<any> {
    return this.httpClient.post<any>(API_PATH.activateLicense + "?license=" + liceseToken, {});
  }

  getLicenseStatus(): Observable<any>  {
    return this.httpClient.get<any>(API_PATH.statusLicense)
  }
  getLicenseInfo(): any  {
    return this.infoLicense
  }
  checkLicense(): string {
    return LICENSE_STATUS.ACTIVATED
  }
}
