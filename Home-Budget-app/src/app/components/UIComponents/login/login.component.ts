import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavbarService} from '../../../shared/Navbar/navbar.service';
import {AuthService} from '../auth/auth.service';
import {AuthLoginInfo} from '../auth/login-info';
import {TokenStorageService} from '../auth/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;

  data : Date = new Date();
  focus;
  focus1;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private navbarService: NavbarService) { }

  ngOnInit() {
    this.navbarService.show();

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }

    var body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }
  ngOnDestroy(){
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

  onSubmit() {
    console.log(this.form);

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
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        this.redirectToIndex();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  redirectToIndex() {
    window.location.replace("/index");
  }

}
