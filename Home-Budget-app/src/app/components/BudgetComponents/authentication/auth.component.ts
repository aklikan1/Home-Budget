import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../UIComponents/auth/auth.service';
import {AuthLoginInfo} from '../../UIComponents/auth/login-info';
import {TokenStorageService} from '../../UIComponents/auth/token-storage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;

  data : Date = new Date();
  focus;
  focus1;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      window.location.replace("budget/dashboard");
    }
  }

  onSubmit() {
    return false;
  }
}
