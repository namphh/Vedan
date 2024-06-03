import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class EnvironmentService{
  constructor(){}
  public getApiURL(): string {
    return "http://" + window.location.hostname +":8000"
  }
}
