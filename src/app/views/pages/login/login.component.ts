import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { SessionStorageService } from '@services/session-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private router: Router,
    private sessionService: SessionStorageService
  ) { }

  signInForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  isShowNotify: boolean = false;
  isLoading: boolean = false;
  messageLoginResponse: string = '* ';

  login() {
    this.isLoading = true;
    this.isShowNotify = false;
    this.messageLoginResponse = '* ';

    const username = this.signInForm.value.username;
    const password = this.signInForm.value.password;

    if (username === 'Vedan' && password === 'Vedan') {
      this.sessionService.saveData('jwt_token', 'your_generated_token');
      this.router.navigateByUrl('/dashboard');
    } else {
      this.isLoading = false;
      this.isShowNotify = true;
      this.messageLoginResponse += 'Invalid username or password.';
    }
  }
}
