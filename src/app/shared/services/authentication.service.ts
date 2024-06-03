import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    constructor(
        private sessionStorageService: SessionStorageService
    ) {}

    public isAuthenticated(): boolean {
        const token = this.sessionStorageService.getData("jwt_token")
        // Check whether the token is expired and return
        // true or false
        if (token) return true;
        return false;
    }
}
