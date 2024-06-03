import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionStorageService } from '@services/session-storage.service';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private sessionService: SessionStorageService
  ) { }
  ngOnInit(): void {
    this.sessionService.removeData("jwt_token")
    this.router.navigateByUrl('');
  }
}
