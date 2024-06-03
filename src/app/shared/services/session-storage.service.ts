import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SessionStorageService {
    constructor() {}

    public saveData(key: string, value: string) {
        sessionStorage.setItem(key, value);
    }

    public getData(key: string) {
        return sessionStorage.getItem(key);
    }

    public removeData(key: string) {
        sessionStorage.removeItem(key);
    }

    public clearData() {
        sessionStorage.clear();
    }
}
