import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentService } from '@services/environment.service';
import { AuthenticationService } from '@services/authentication.service';
import { SessionStorageService } from '@services/session-storage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
      private authenticationService: AuthenticationService,
      private sessionService: SessionStorageService,
      private environmentService: EnvironmentService
    ) {}

    intercept(
        httpRequest: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (!httpRequest.url.includes('/assets/i18n')) {
            httpRequest = httpRequest.clone({
                url: this.environmentService.getApiURL() + httpRequest.url,
            });
        }
        const isAuthenticated = this.authenticationService.isAuthenticated();
        if (isAuthenticated) {
            const jwt_token = this.sessionService.getData("jwt_token")

            httpRequest = httpRequest.clone({
                setHeaders: {
                    Authorization: jwt_token?jwt_token:"",
                },
            });
        }
        return next.handle(httpRequest);
    }
}
