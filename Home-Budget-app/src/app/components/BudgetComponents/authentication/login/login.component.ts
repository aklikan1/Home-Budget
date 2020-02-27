import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../UIComponents/auth/auth.service';
import {AuthLoginInfo} from '../../../UIComponents/auth/login-info';
import {TokenStorageService} from '../../../UIComponents/auth/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedOut = true;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;

  data : Date = new Date();
  focus;
  focus1;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedOut = false;
      window.location.replace("budget/dashboard");
    }
  }

  onSubmit() {
    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password
    );

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        //console.log(data);
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);
        this.tokenStorage.saveUserId(data.id);

        this.isLoginFailed = false;
        this.isLoggedOut = false;
        this.roles = this.tokenStorage.getAuthorities();
        this.redirectToBudgetDashboard();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  redirectToBudgetDashboard() {
    window.location.replace("/budget/dashboard");
  }
}
