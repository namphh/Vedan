 import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LicenseService } from '@services/license.service';
import { LICENSE_STATUS } from '@constants/license-status';

@Injectable({
    providedIn: 'root',
})
export class LicenseGuard implements CanActivate {
  constructor(
    private router: Router,
    private licenseService: LicenseService

  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
      if (this.licenseService.checkLicense() == LICENSE_STATUS.INVALID || this.licenseService.checkLicense() == LICENSE_STATUS.OUT_DATE) {
        this.router.navigateByUrl('');
        return false
      }
      else {
        return true
      }
    // if (
    //     this.authenticationService.isAuthenticated() &&
    //     state.url == '/pages/login'
    // ) {
    //     this.router.navigateByUrl('');
    //     return false;
    // } else if (
    //     !this.authenticationService.isAuthenticated() &&
    //     state.url != '/pages/login'
    // ) {
    //     this.router.navigateByUrl('/pages/login');
    //     return false;
    // }
  }
}
