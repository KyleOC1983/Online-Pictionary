import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user;

    constructor(private auth: AuthenticationService) {
      this.user = auth.authInfo;
    }
  // 
    login() {
      this.auth.login();
    }
  // 
    logout() {
      this.auth.logout();
    }
  // 
  }
