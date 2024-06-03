import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | boolean
        | UrlTree
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> {
        if (
            this.authenticationService.isAuthenticated() &&
            state.url == '/pages/login'
        ) {
            this.router.navigateByUrl('');
            return false;
        } else if (
            !this.authenticationService.isAuthenticated() &&
            state.url != '/pages/login'
        ) {
            this.router.navigateByUrl('/pages/login');
            return false;
        }
        return true;
    }
}
